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

module.exports = router;
