const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db_conn.js");

const app = express();
const route = require("./routes/Route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", route);
const port = process.env.PORT || 3000;

app.use("/", route);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
