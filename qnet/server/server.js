const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
let idNUM = 2;

const uri = "mongodb://" + PORT + "/data";

app.get('/api/hello', (req, res) => {
    res.send({ message: 'Hello, World!' });
  });

  app.post('/api/test', (req, res) => {
    const { message } = req.body;
  
    if (message) {
      res.status(200).send({ success: true, message: `Received your message: "${message}"` });
    } else {
      res.status(400).send({ success: false, message: 'No message received' });
    }
  });

app.use(cors());
app.use(bodyParser.json());
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});