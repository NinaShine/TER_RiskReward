const mongoose = require("mongoose");
const path = require("path");

// Charger les variables d'environnement en local (Render gère les variables autrement)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

const mongoURI = process.env.MONGO_URI || `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority&appName=Cluster0`;

console.log("🔗 Tentative de connexion à MongoDB...");

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`✅ Connecté à MongoDB: ${mongoose.connection.name}`))
  .catch((err) => console.error("❌ Erreur de connexion MongoDB :", err));

module.exports = mongoose;
