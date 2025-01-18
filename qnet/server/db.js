require("dotenv").config(); 
const mongoose = require("mongoose");


const connectionString = process.env.MONGO_URI;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
