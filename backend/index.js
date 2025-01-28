const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./config/db_conn.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use("/", require("./routes/Route"));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
