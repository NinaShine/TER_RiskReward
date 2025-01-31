const express = require("express");
const router = express.Router();
const Text = require("../models/textModel"); // Assurez-vous que le modèle est correct

// Fonction pour récupérer un texte et une image aléatoire
async function getRandomText() {
  const count = await Text.countDocuments();
  if (count === 0) return null;
  const randomIndex = Math.floor(Math.random() * count);
  return Text.findOne().skip(randomIndex);
}

// Définition de la route
router.get("/random-text", async (req, res) => {
  try {
    const randomText = await getRandomText();

    if (!randomText) {
      return res
        .status(404)
        .json({ message: "Aucun texte trouvé dans la base de données" });
    }

    res.json({
      content: randomText.content,
      imageUrl: randomText.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
