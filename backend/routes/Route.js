const express = require("express");
const router = express.Router();
const Text = require("../models/textModel");
const Response = require("../models/responseModel");

// Route pour ajouter un texte
router.post("/text", async (req, res) => {
  try {
    const newText = new Text(req.body);
    const savedText = await newText.save();
    res.status(201).json(savedText);
  } catch (err) {
    res
      .status(400)
      .json({ message: "Erreur lors de l'ajout du texte", error: err.message });
  }
});

// Route pour récupérer tous les textes
router.get("/text", async (req, res) => {
  try {
    const texts = await Text.find();
    res.status(200).json(texts);
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la récupération des textes",
      error: err.message,
    });
  }
});

router.get("/random-text", async (req, res) => {
  try {
    // Initialiser la liste une seule fois par utilisateur
    if (!req.session.randomTexts) {
      const allTexts = await Text.find();
      if (!allTexts.length) {
        return res.status(404).json({ message: "Aucun texte trouvé" });
      }

      // Dupliquer chaque texte
      let texts = [];
      allTexts.forEach((text) => {
        texts.push(text, text);
      });

      // Mélanger le tableau (algorithme de Fisher-Yates)
      for (let i = texts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [texts[i], texts[j]] = [texts[j], texts[i]];
      }
      req.session.randomTexts = texts;
    }

    // Vérifier si la liste est vide (ne pas réinitialiser si c'est le cas)
    if (req.session.randomTexts.length === 0) {
      return res
        .status(200)
        .json({ message: "Toutes les ressources ont été affichées." });
    }

    // Extraire et retourner le prochain élément avec shift()
    const randomText = req.session.randomTexts.shift();
    res.json({
      content: randomText.content,
      imageUrl: randomText.imageUrl,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

router.post("/submit", async (req, res) => {
  //Cette route devra push les données dans la bdd
  //Il faut aussi rajouter plus de contexte à la fonction si on veut éviter d'avoir à faire jongler les infos.
  console.log("Route appelé");
  try {
    const body = req.body;
    res.json({
      content: body,
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});
module.exports = router;
