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

// Fonction pour récupérer un texte et une image aléatoire
async function getRandomText() {
  const count = await Text.countDocuments();
  if (count === 0) return null;
  const randomIndex = Math.floor(Math.random() * count);
  return Text.findOne().skip(randomIndex);
}

// Route qui retourne un texte et une image aléatoire
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


router.post("/submit",async(req,res)=>{ //Cette route devra push les données dans la bdd
                                        //Il faut aussi rajouter plus de contexte à la fonction si on veut éviter d'avoir à faire jongler les infos.
  console.log("Route appelé");
  try{
    const body = req.body;
    res.json({
      content:body
    });
  }catch (error){
    res.status(500).json({message:"Erreur serveur",error});
  }
});
module.exports = router;
