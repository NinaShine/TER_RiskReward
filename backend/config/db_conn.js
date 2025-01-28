const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });

const mongo_username = process.env.MONGO_USERNAME;
const mongo_password = process.env.MONGO_PASSWORD;
const mongo_cluster = process.env.MONGO_CLUSTER;
const mongo_database = process.env.MONGO_DBNAME;

const mongoURI = `mongodb+srv://${mongo_username}:${mongo_password}@${mongo_cluster}/${mongo_database}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose
  .connect(mongoURI)
  .then(() => console.log(`Connected to: ${mongoose.connection.name}`))
  .catch((err) => console.log("Database connection error:", err));

module.exports = mongoose;
