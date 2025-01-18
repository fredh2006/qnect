
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });
app.use(bodyParser.json());
app.use(cors());
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  social_media: { type: String, required: true },
  sexuality: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  questions: { type: Map, of: String, required: true },
  email: { unique: true, type: String, required: true},
  password: { type: String, required: true },
  likes: { type: [String], default: [] },
  matches: { type: [String], default: [] },
  
});
const Person = mongoose.model("Person", personSchema);
app.post("/api/person", (req, res) => {
  const { name, about, social_media, sexuality, gender, age, location, questions, email, password, likes, matches } = req.body;
  if (!name || !about || !social_media || !sexuality || !gender || !age || !location || !questions || !email || !password || !likes || !matches) {
    return res.status(400).send({ success: false, message: "All fields are required." });
  }
  const newPerson = new Person({ name, about, social_media, sexuality, gender, age, location, questions, email, password, likes, matches });
  newPerson.save()
    .then(savedPerson => {
      res.status(200).send({
        success: true,
        message: "Person created successfully",
        person: savedPerson,
        personId: savedPerson._id  // Return the person ID
      });
    })
    .catch(err => {
      res.status(500).send({ success: false, message: "Error saving person", error: err });
    });
});

app.get("/api/people", (req, res) => {
  Person.find()
    .then(people => {
      res.status(200).send({ success: true, people });
    })
    .catch(err => {
      res.status(500).send({ success: false, message: "Error retrieving people", error: err });
    });
});
app.get("/api/person/:id", (req, res) => {
  const personId = req.params.id;
  Person.findById(personId)
    .then(person => {
      if (!person) {
        return res.status(404).send({ success: false, message: "Person not found" });
      }
      res.status(200).send({ success: true, person });
    })
    .catch(err => {
      res.status(500).send({ success: false, message: "Error retrieving person", error: err });
    });
});
app.post("/api/person/:id/match", (req, res) => {
    const personId = req.params.id;
    const { matchId } = req.body;
  
    if (!matchId) {
      return res.status(400).send({ success: false, message: "Match ID is required" });
    }
  
    Person.findById(personId)
      .then(person => {
        if (!person) {
          return res.status(404).send({ success: false, message: "Person not found" });
        }
  
        if (!person.matches.includes(matchId)) {
          person.matches.push(matchId);
        }
  
        return person.save();
      })
      .then(updatedPerson => {
        res.status(200).send({ success: true, message: "Match added successfully", person: updatedPerson });
      })
      .catch(err => {
        res.status(500).send({ success: false, message: "Error adding match", error: err });
      });
  });
  app.post("/api/person/:id/like", (req, res) => {
    const personId = req.params.id;
    const { likedId } = req.body;
    console.log(`Person ID: ${personId}, Liked ID: ${likedId}`);
    if (!likedId) {
        return res.status(400).send({ success: false, message: "Liked ID is required" });
    }
    // First, find the person who is liking
    Person.findById(personId)
        .then(person => {
            if (!person) {
                console.log(`Person with ID ${personId} not found`);
                return res.status(404).send({ success: false, message: "Person not found" });
            }
            // Add the likedId to the current person's likes if not already present
            if (!person.likes.includes(likedId)) {
                person.likes.push(likedId);
                console.log(`Liked person ID ${likedId} added to ${personId}'s likes`);
            }
            // Save the person after liking the other
            return person.save();
        })
        .then(updatedPerson => {
            // Now, find the liked person to check if they also liked the original person
            return Person.findById(likedId).then(likedPerson => {
                if (!likedPerson) {
                    console.log(`Liked person with ID ${likedId} not found`);
                    return res.status(404).send({ success: false, message: "Liked person not found" });
                }
                // Check if the liked person has also liked the original person (mutual like)
                if (likedPerson.likes.includes(updatedPerson._id)) {
                    console.log(`Mutual like found between ${updatedPerson._id} and ${likedPerson._id}`);
                    // Both users like each other, so add them to each other's matches
                    if (!likedPerson.matches.includes(updatedPerson._id)) {
                        likedPerson.matches.push(updatedPerson._id);
                    }
                    if (!updatedPerson.matches.includes(likedPerson._id)) {
                        updatedPerson.matches.push(likedPerson._id);
                    }
                    // Save both people after adding them to each other's matches
                    return Promise.all([likedPerson.save(), updatedPerson.save()]);
                }
                // No mutual like, so just return the updated person
                return updatedPerson;
            });
        })
        .then(() => {
            console.log(`Like processed successfully`);
            res.status(200).send({ success: true, message: "Like processed successfully" });
        })
        .catch(err => {
            console.log("Error in like process:", err);
            res.status(500).send({ success: false, message: "Error processing like", error: err });
        });
});

  
app.get("/api/people/location/:location/user/:userId", async (req, res) => {
  const location = req.params.location;
  const userId = req.params.userId;
  try {
    // Fetch the current user to get their `likes` array
    const currentUser = await Person.findById(userId);
    if (!currentUser) {
      return res.status(404).send({ success: false, message: "User not found" });
    }
    const likedUserIds = currentUser.likes.map(id => new mongoose.Types.ObjectId(id)); // Convert likes to ObjectId
    // Find people in the specified location excluding those in the `likes` array
    const people = await Person.find({
      location: { $regex: new RegExp(location, "i") }, // Case-insensitive location match
      _id: { $nin: likedUserIds }, // Exclude users already liked by the current user
    });
    if (people.length === 0) {
      return res.status(200).send({ success: true, message: "No people left to like", people: [] });
    }
    res.status(200).send({ success: true, people });
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Error retrieving people by location",
      error: err.message,
    });
  }
});
  app.get("/api/people/location/:location/user/:userId", async (req, res) => {
    const location = req.params.location;
    const userId = req.params.userId;
  
    try {
      // Convert userId to ObjectId for consistent querying
      const userObjectId = new mongoose.Types.ObjectId(userId);
  
      // Find people in the specified location excluding those already liked by the user
      const people = await Person.find({
        location: { $regex: new RegExp(location, "i") }, // Case-insensitive location match
        likes: { $ne: userObjectId }, // Exclude people the user has already liked
      });
  
      if (people.length === 0) {
        return res.status(200).send({ success: true, message: "No people left to like", people: [] });
      }
  
      res.status(200).send({ success: true, people });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: "Error retrieving people by location",
        error: err.message,
      });
    }
  });

  app.get("/api/person/email/:email", (req, res) => {
    const email = req.params.email;
  
    // Use MongoDB's findOne to fetch a person by email
    Person.findOne({ email: email })
      .then(person => {
        if (!person) {
          return res.status(404).send({ success: false, message: "Person not found with that email" });
        }
        res.status(200).send({ success: true, person });
      })
      .catch(err => {
        res.status(500).send({ success: false, message: "Error retrieving person by email", error: err });
      });
  });
  
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
