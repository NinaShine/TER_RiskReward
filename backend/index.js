const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
require("./config/db_conn.js");

const app = express();
const route = require("./routes/Route");

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret-key", // Clé en attendant pour tester
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, sameSite: "lax" }, // Passe à true si HTTPS
  })
);

const http = require("http");
const https = require("https");

http.globalAgent.keepAlive = false; // 🔥 Désactive Keep-Alive pour HTTP
https.globalAgent.keepAlive = false; // 🔥 Désactive Keep-Alive pour HTTPS

console.log("🚀 Keep-Alive désactivé pour HTTP et HTTPS");

app.use((req, res, next) => {
  console.log(
    `📡 [${new Date().toISOString()}] Requête reçue : ${req.method} ${req.url}`
  );
  next();
});

app.use((req, res, next) => {
  console.log(`📡 Requête reçue : ${req.method} ${req.url}`);
  next();
});

app.use((req, res, next) => {
  res.setHeader("Connection", "close"); // 🔥 Force la fermeture de la connexion après chaque requête
  next();
});

app.use((err, req, res, next) => {
  console.error("🔥 Erreur serveur détectée :", err);
  res.status(500).json({ error: "Erreur serveur", details: err.message });
});

app.use((req, res, next) => {
  console.log("📝 Cookies reçus :", req.headers.cookie);
  next();
});

app.use("/", route);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
