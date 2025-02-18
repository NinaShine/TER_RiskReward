const express = require("express");
const router = express.Router();
const Text = require("../models/textModel");
const Response = require("../models/responseModel");

//L'idée globale du changement c'est de merge la route /init et /random-text
//Modifier getIndividus pour l'adapter aux URL d'image pour Etienne

//Rajouter le routing de page d'accueil et surtout la route de la répartition des forces qui sera stocké en session et ne sera pas temporaire.

// Fonction pour récupérer un texte et une image aléatoire
/*async function getRandomText() {
  const count = await Text.countDocuments();
  if (count === 0) return null;
  const randomIndex = Math.floor(Math.random() * count);
  return Text.findOne().skip(randomIndex);
}
*/
// Route qui retourne un texte et une image aléatoire
router.get("/init", async (req, res) => {
  console.log("requête init");
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
    // Note : A partir d'ici, rajouter la logique métier de /init pour qu'elle créée un contexte complet
    if (req.session.randomTexts.length === 0) {
      return res
        .status(200)
        .json({ message: "Toutes les ressources ont été affichées." });
    }

    // Extraire et retourner le prochain élément avec shift()
    const individus = await getIndividus();
    console.log(
      "📋 Liste des textes restants :",
      req.session.randomTexts.length
    );

    const randomText = req.session.randomTexts.shift();
    console.log(" Texte sélectionné :", randomText);

    req.session.scenario = {
      textId: randomText._id,
      text: randomText.content,
      image: randomText.imageUrl,
      association: randomText.associationType,
      individuA: individus.a,
      individuB: individus.b,
    };

    //console.log("✅ Scenario sauvegardé :", req.session.scenario);

    req.session.save((err) => {
      if (err) {
        console.error("❌ Erreur lors de la sauvegarde de la session :", err);
        return res
          .status(500)
          .json({ error: "Erreur de sauvegarde de la session." });
      }

      res.json(req.session.scenario);
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});
/*

viellie fonction devenue obsolète

router.get("/init2", async (req, res) => {
  console.log("Session actuelle :", req.session);
  const scenario = await getRandomText();
  const individus = await getIndividus();
  //console.log(scenario);
  //console.log(individus);
  req.session.scenario = {
    textId: scenario.id,
    text: scenario.content,
    image: scenario.imageUrl,
    association: scenario.toObject().associationType,
    individuA: individus.a,
    individuB: individus.b,
  };
  console.log("Création de la session");
  console.log("Session après création:", req.session); // ✅ Affiche la session après ajout du scénario

  req.session.save((err) => {
    if (err) {
      console.error("Erreur de save de la session : ", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  });
  res.json(req.session.scenario);
});
*/

router.post("/submit", async (req, res) => {
  //Cette route devra push les données dans la bdd
  //Il faut aussi rajouter plus de contexte à la fonction si on veut éviter d'avoir à faire jongler les infos.
  const scenario = req.session.scenario;
  //console.log("Récupération de la session : ", scenario);
  if (!req.session.scenario) {
    console.error("Aucune session trouvée !");
    return res.status(400).json({
      error: "Session non trouvée. Avez-vous bien appelé /init avant ?",
    });
  }
  try {
    const body = req.body;
    const { sliderValue1, sliderValue2 } = req.body;
    console.log("Récup des slides : ", sliderValue1, " - ", sliderValue2);
    if (!req.session.scenario) {
      return res.status(400).json({ message: "Session invalide ou expirée." });
    }
    console.log("Début des créations");
    const firstResponse = await Response.create({
      textId: scenario.textId,
      valueOne: sliderValue1.first,
      valueTwo: sliderValue2.first,
      associationType: scenario.association,
      personType: scenario.individuA,
    });
    console.log("Premier create fait");
    const secondResponse = await Response.create({
      textId: scenario.textId,
      valueOne: sliderValue1.second,
      valueTwo: sliderValue2.second,
      associationType: scenario.association,
      personType: scenario.individuB,
    });
    console.log("Réponse Enregistré");
    req.session.randomTexts = [...req.session.randomTexts]; // Force la mise à jour
    await req.session.save();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});
module.exports = router;

async function getIndividus() {
  //Modifier tab pour en faire un objet permettant de stocker l'url de l'img de l'individu
  const tab = [
    "vieux pas genré",
    "enfant pas genré",
    "robot",
    "homme petite taille",
    "femme petite taille",
    "homme grande taille",
    "femme grande taille",
  ];
  const indexa = Math.floor(Math.random() * tab.length);
  let j = Math.floor(Math.random() * tab.length);
  while (j == indexa) {
    j = Math.floor(Math.random() * tab.length);
  }
  const indexb = j;
  const a = tab[indexa];
  const b = tab[indexb];
  return {
    a: a,
    b: b,
  };
}
