const mongoose = require("mongoose");


const connectionString = ``;

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    UseUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));
