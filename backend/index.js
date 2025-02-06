const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
require("./config/db_conn.js");

const app = express();
const route = require("./routes/Route");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration d'express-session (à mettre ici pour toute l'application)
app.use(
  session({
    secret: "votre-secret", // Changez cette valeur pour une clé sécurisée
    resave: false,
    saveUninitialized: true,
  })
);

// Utiliser vos routes avec un préfixe /api
app.use("/api", route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
