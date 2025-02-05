const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db_conn.js");

const app = express();
const route = require("./routes/Route");
const session = require('express-session');

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'secret-key', // Clé en attendant pour tester
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, httpOnly:true, sameSite:"lax" } // Passe à true si HTTPS
}));

app.use((req, res, next) => {
  console.log("📝 Cookies reçus :", req.headers.cookie);
  next();
});

app.use("/", route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
