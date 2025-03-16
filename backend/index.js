const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
require("./config/db_conn.js");
const path = require("path"); // Ajoute cette ligne au début du fichier
const MongoStore = require("connect-mongo"); // Ajout du stockage MongoDB



const app = express();
const route = require("./routes/Route");


// IMPORTANT : faire confiance au proxy pour les cookies sécurisés
app.set('trust proxy', 1);

app.use(
  cors({
    origin: "https://choices-eta.vercel.app/", 
    credentials: true, 
  })
);

app.use(
  session({
    secret: "secret-key", // Clé en attendant pour tester
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // 🔥 Stocker les sessions en base MongoDB
      collectionName: "sessions"
    }),
    proxy: true,
    cookie: {
      secure: true,
      httpOnly: true, 
      sameSite: "none",
    }, // Passe à true si HTTPS
  })
);

//app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", route);


// 🔹 Servir les fichiers Angular depuis la racine
const angularDistPath = path.join(__dirname, "dist", "frontend-app", "browser");

// ✅ Servir les fichiers Angular
app.use(express.static(angularDistPath));

app.get("*", (req, res, next) => {
  if (req.url.startsWith("/api/") || req.url.endsWith(".js") || req.url.endsWith(".css") || req.url.endsWith(".ico") || req.url.endsWith(".json")) {
    return next();
  }
  res.sendFile(path.join(angularDistPath, "index.html"));
});



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

app.use((err, req, res, next) => {
  console.error("🔥 Erreur serveur détectée :", err);
  res.status(500).json({ error: "Erreur serveur", details: err.message });
});

app.use((req, res, next) => {
  console.log("📝 Cookies reçus :", req.headers.cookie);
  console.log("🔹 Session ID en cours :", req.sessionID);
  next();
});


const port = process.env.PORT || 3000;

module.exports = app;



