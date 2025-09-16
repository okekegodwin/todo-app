require("dotenv").config();

const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI;

function connectToMongoDatabase() {
  mongoose.connect(MONGODB_URI);

  mongoose.connection.on("connected", () => {
    console.log("Connection to database successful!");
  })

  mongoose.connection.on("error", () => {
    console.log("Error occured connecting to database");
  })
}

module.exports = { connectToMongoDatabase }