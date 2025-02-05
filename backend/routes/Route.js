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

router.get("/init", async (req,res)=>{
  //console.log("Session actuelle :", req.session);
  const scenario = await getRandomText();
  const individus = await getIndividus();
  //console.log(scenario);
  //console.log(individus);
  req.session.scenario = {
    textId:scenario.id,
    text:scenario.content,
    image:scenario.imageUrl,
    individuA:individus.a,
    individuB:individus.b
  }
  req.session.save(err=>{
    if (err){
      console.error("Erreur de save de la session : ",err);
      return res.status(500).json({error:"Internal Server Error"});
    }
  })
  res.json(req.session.scenario);
})

router.post("/submit",async(req,res)=>{ //Cette route devra push les données dans la bdd
                                        //Il faut aussi rajouter plus de contexte à la fonction si on veut éviter d'avoir à faire jongler les infos.
  const scenario = req.session.scenario;
  console.log("Récupération de la session : ",scenario);
  if (!req.session.scenario) {
    console.error("Aucune session trouvée !");
    return res.status(400).json({ error: "Session non trouvée. Avez-vous bien appelé /init avant ?" });
  }
  try{
    const body = req.body;
    res.json({
      content:body
    });
    const {sliderValue1, sliderValue2} = req.body;
    console.log("Récup des slides : ",sliderValue1," - ",sliderValue2);
    if (!req.session.scenario) {
      return res.status(400).json({ message: "Session invalide ou expirée." });
    }
    const newResponse = Response.create({
      textId:scenario.id,
      valueOne:sliderValue1.first,
      valueTwo:sliderValue1.second,
    })
  }catch (error){
    res.status(500).json({message:"Erreur serveur",error});
  }
});
module.exports = router;

async function getIndividus(){
  const tab = [
    "vieux pas genré",
    "enfant pas genré",
    "robot",
    "homme petite taille",
    "femme petite taille",
    "homme grande taille",
    "femme grande taille",
  ];
  const indexa = Math.floor(Math.random()*tab.length);
  let j = Math.floor(Math.random()*tab.length);
  while (j==indexa){
    j = Math.floor(Math.random()*tab.length);
  }
  const indexb = j;
  const a = tab[indexa];
  const b = tab[indexb];
  return {
    a:a,
    b:b
  }
}