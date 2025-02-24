const express = require("express");
const router = express.Router();
const Text = require("../models/textModel");
const Response = require("../models/responseModel");

//Rajouter le routing de page d'accueil et surtout la route de la répartition des forces qui sera stocké en session et ne sera pas temporaire.

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
      req.session.turn=1;
    }else{
      req.session.turn++;
    }

    // Vérifier si la liste est vide (ne pas réinitialiser si c'est le cas)
    // Note : A partir d'ici, rajouter la logique métier de /init pour qu'elle créée un contexte complet
    if (req.session.randomTexts.length === 0) {
      return res
        .status(200)
        .json({ 
          message: "Toutes les ressources ont été affichées.",
          allRessourcesDisplayed: true
         });
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

    //req.session.randomTexts = [...req.session.randomTexts]; // Forcer l'enregistrement de la liste modifiée

    req.session.save((err) => {
      if (err) {
        console.error("❌ Erreur lors de la sauvegarde de la session :", err);
        return res
          .status(500)
          .json({ error: "Erreur de sauvegarde de la session." });
      }

      res.json({
        scenario: req.session.scenario,
        turn: req.session.turn
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

router.post("/submit", async (req, res) => {
  const scenario = req.session.scenario;
  if (!scenario) {
    console.error("Aucune session trouvée !");
    return res.status(400).json({
      error: "Session non trouvée. Avez-vous bien appelé /init avant ?",
    });
  }
  try {
    const { sliderValue1, sliderValue2, forces } = req.body;
    console.log("Slides reçues :", sliderValue1, sliderValue2);

    if (!forces) {
      return res
        .status(400)
        .json({ message: "Forces manquantes dans le body" });
    }

    // Rechercher dans forces les valeurs correspondant aux individus
    const forceAObj = forces.find((f) => f.desc === scenario.individuA);
    const forceBObj = forces.find((f) => f.desc === scenario.individuB);

    if (!forceAObj || !forceBObj) {
      return res
        .status(400)
        .json({ message: "Force non trouvée pour l'un des individus" });
    }

    // Créer un document unique regroupant toutes les infos
    const newResponse = await Response.create({
      textId: scenario.textId,
      associationType: scenario.association,
      // Personne A
      personAType: scenario.individuA,
      valueOneA: sliderValue1.first,
      valueTwoA: sliderValue2.first,
      forceA: forceAObj.value,
      // Personne B
      personBType: scenario.individuB,
      valueOneB: sliderValue1.second,
      valueTwoB: sliderValue2.second,
      forceB: forceBObj.value,
    });

    console.log("Réponse enregistrée :", newResponse);
    //req.session.randomTexts = [...req.session.randomTexts]; // Mise à jour forcée
    //await req.session.save();
    res
      .status(200)
      .json({ message: "Réponse enregistrée", response: newResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

router.post("/reset-session", (req, res) => {
  console.log("🔄 Réinitialisation de la session...");
  
  if (req.session) {
    // Sauvegarder uniquement les informations utilisateur
    const userData = req.session.user; 

    // Détruire la session
    req.session.regenerate((err) => {
      if (err) {
        console.error("Erreur lors de la réinitialisation de la session :", err);
        return res.status(500).json({ message: "Erreur serveur lors de la réinitialisation" });
      }

      // Restaurer les données utilisateur
      req.session.user = userData;
      
      console.log("✅ Session réinitialisée, utilisateur conservé :", req.session.user);
      res.status(200).json({ message: "Session réinitialisée" });
    });
  } else {
    res.status(400).json({ message: "Aucune session active" });
  }
});


module.exports = router;

async function getIndividus() {
  //Modifier tab pour en faire un objet permettant de stocker l'url de l'img de l'individu
  const tab = [
    "Vieux pas genré",
    "Enfant pas genré",
    "Robot",
    "Homme petite taille",
    "Femme petite taille",
    "Homme grande taille",
    "Femme grande taille",
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