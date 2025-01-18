require("dotenv").config();  // Load environment variables from the .env file

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;  // Get port from the environment variable, fallback to 3000

// Use MONGO_URI environment variable
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

// Updated personSchema with a matches array
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  social_media: { type: String, required: true },
  sexuality: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  questions: { type: Map, of: String, required: true },
  email: { type: String, required: true},
  password: { type: String, required: true },
  likes: { type: [Number], default: [] },
  matches: { type: [Number], default: [] }, // List of matched person IDs
});

const Person = mongoose.model("Person", personSchema);

app.post("/api/person", (req, res) => {
  const { name, about, social_media, sexuality, gender, age, location, questions, email, password, likes, matches } = req.body;

  if (!name || !about || !social_media || !sexuality || !gender || !age || !location || !questions || !email || !password || !likes || !matches) {
    return res.status(400).send({ success: false, message: "All fields are required." });
  }

  const newPerson = new Person({ name, about, social_media, sexuality, gender, age, location, questions, email, password, likes, matches});

  newPerson.save()
    .then(savedPerson => {
      res.status(200).send({ success: true, message: "Person created successfully", person: savedPerson });
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
    const personId = req.params.id; // Get person ID from the URL parameter
    const { matchId } = req.body; // Get match ID from the request body
  
    if (!matchId) {
      return res.status(400).send({ success: false, message: "Match ID is required" });
    }
  
    Person.findById(personId)
      .then(person => {
        if (!person) {
          return res.status(404).send({ success: false, message: "Person not found" });
        }
  
        // Add matchId to the person's matches array if not already present
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
    const personId = req.params.id; // The person who likes someone
    const { likedId } = req.body; // The person being liked
  
    if (!likedId) {
      return res.status(400).send({ success: false, message: "Liked ID is required" });
    }
  
    Person.findById(personId)
      .then(person => {
        if (!person) {
          return res.status(404).send({ success: false, message: "Person not found" });
        }
  
        // Add the likedId to the person's likes array if not already there
        if (!person.likes.includes(likedId)) {
          person.likes.push(likedId);
        }
  
        return person.save().then(() => {
          // Check if the liked person also likes this person
          return Person.findById(likedId);
        });
      })
      .then(likedPerson => {
        if (!likedPerson) {
          return res.status(404).send({ success: false, message: "Liked person not found" });
        }
  
        // If the liked person also likes this person, add to both matches arrays
        if (likedPerson.likes.includes(personId)) {
          if (!likedPerson.matches.includes(personId)) {
            likedPerson.matches.push(personId);
          }
          return likedPerson.save().then(() => {
            return Person.findById(personId);
          });
        }
        return Person.findById(personId);
      })
      .then(person => {
        if (!person) {
          return res.status(404).send({ success: false, message: "Person not found during final save" });
        }
  
        if (!person.matches.includes(likedId)) {
          person.matches.push(likedId);
        }
  
        return person.save();
      })
      .then(updatedPerson => {
        res.status(200).send({ success: true, message: "Like processed successfully", person: updatedPerson });
      })
      .catch(err => {
        res.status(500).send({ success: false, message: "Error processing like", error: err });
      });
  });
  

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
