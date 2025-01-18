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

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  about: { type: String, required: true },
  social_media: { type: String, required: true },
  sexuality: { type: String, required: true },
  gender: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  questions: { type: Map, of: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  id: { type: Number, required: true },
});

const Person = mongoose.model("Person", personSchema);

app.post("/api/person", (req, res) => {
  const { name, about, social_media, sexuality, gender, age, location, questions, email, password, id } = req.body;

  if (!name || !about || !social_media || !sexuality || !gender || !age || !location || !questions || !email || !password || !id) {
    return res.status(400).send({ success: false, message: "All fields are required." });
  }

  const newPerson = new Person({ name, about, social_media, sexuality, gender, age, location, questions, email, password, id });

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
