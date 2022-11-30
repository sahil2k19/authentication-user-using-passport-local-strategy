const mongoose = require("mongoose");

const db = mongoose.connection;
mongoose.connect("mongodb://127.0.0.1/testDB");

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;
