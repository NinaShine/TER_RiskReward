const express = require("express");
const router = express.Router();
const Text = require("../models/textModel");
const Response = require("../models/responseModel");
const Form = require("../models/formModel"); 

router.get("/init", async (req, res) => {
  console.log("requête init");
  try {
    if (!req.session.randomTexts) {
      const allTexts = await Text.find();
      if (!allTexts.length) {
        return res.status(404).json({ message: "Aucun texte trouvé" });
      }

      let texts = [];
      allTexts.forEach((text) => {
        texts.push(text, text);
      });

      for (let i = texts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [texts[i], texts[j]] = [texts[j], texts[i]];
      }
      req.session.randomTexts = texts;
      req.session.turn = 1;
      req.session.scores = initScore();
      console.log("Request.session: ", req.session);
    } else {
      req.session.turn++;
    }

    if (req.session.randomTexts.length === 0) {
      return res.status(200).json({
        message: "Toutes les ressources ont été affichées.",
        allRessourcesDisplayed: true,
      });
    }

    const individus = await getIndividus();
    console.log(
      " Liste des textes restants :",
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


    req.session.save((err) => {
      if (err) {
        console.error(" Erreur lors de la sauvegarde de la session :", err);
        return res
          .status(500)
          .json({ error: "Erreur de sauvegarde de la session." });
      }

      res.json({
        scenario: req.session.scenario,
        turn: req.session.turn,
        scores: req.session.scores,
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

router.get("/next", async (req, res) => {
  try {
    if (!req.session.randomTexts || !req.session.scenario) {
      return res.status(400).json({ message: "Session non initialisée" });
    }

    if (req.session.randomTexts.length === 1) {
      return res.status(200).json({
        message: "Toutes les ressources ont été affichées.",
        allRessourcesDisplayed: true,
      });
    }

    const individus = await getIndividus();
    console.log(
      "Liste des textes restants :",
      req.session.randomTexts.length
    );
    const randomText = req.session.randomTexts.shift();
    console.log(" Texte sélectionné :", randomText);

    req.session.turn++;

    req.session.scenario = {
      textId: randomText._id,
      text: randomText.content,
      image: randomText.imageUrl,
      association: randomText.associationType,
      individuA: individus.a,
      individuB: individus.b,
    };

    req.session.save((err) => {
      if (err) {
        return res.status(500).json({ error: "Erreur de sauvegarde de la session." });
      }
      res.json({
        scenario: req.session.scenario,
        turn: req.session.turn,
        scores: req.session.scores,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});


router.post("/submitForm", async (req, res) => {
  try {
    const { genre, age, nationalite, niveauEtudes } = req.body;

    if (!genre || !age || !nationalite || !niveauEtudes) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires." });
    }

    const sessionId = req.sessionID; 


    const newForm = await Form.create({
      genre,
      age,
      nationalite,
      niveauEtudes,
      sessionId, 
    });

    await newForm.save();

    res.status(201).json({ message: "Formulaire enregistré avec succès", sessionId });
  } catch (error) {
    console.error("Erreur lors de l’enregistrement :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});




router.post("/submit", async (req, res) => {
  const scenario = req.session.scenario;
  const sessionId = req.sessionID; 
  console.log("Session ID :", sessionId);
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

    const forceAObj = forces.find((f) => f.desc === scenario.individuA);
    const forceBObj = forces.find((f) => f.desc === scenario.individuB);

    if (!forceAObj || !forceBObj) {
      return res
        .status(400)
        .json({ message: "Force non trouvée pour l'un des individus" });
    }

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


      sessionId: sessionId,
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
  console.log("Réinitialisation de la session...");

  if (req.session) {
    const userData = req.session.user;

    req.session.regenerate((err) => {
      if (err) {
        console.error(
          "Erreur lors de la réinitialisation de la session :",
          err
        );
        return res
          .status(500)
          .json({ message: "Erreur serveur lors de la réinitialisation" });
      }

      req.session.user = userData;

      console.log(
        " Session réinitialisée, utilisateur conservé :",
        req.session.user
      );
      res.status(200).json({ message: "Session réinitialisée" });
    });
  } else {
    res.status(400).json({ message: "Aucune session active" });
  }
});


router.post("/compute-stats", (req,res)=>{
  console.log("Calcul des stats");
  try{
    let scores = req.body;
    console.log("Scores : ", scores);
    const details = req.body;
    let winners = {
      risk : {avg : 0, perso :""},
      reward : {avg : 0, perso :""},
      effort : {avg : 0, perso :""}
    };
    console.log("Debut du for");
    for (const perso in scores){
      console.log("Perso : ", perso);
      for (const categorie in scores[perso]){
        console.log("Categories :", categorie);
        //Mise à jour du score max par catégorie
        console.log("Objet actuel : ", scores[perso][categorie]);
        scores[perso][categorie].score /= scores[perso][categorie].count;
        //console.log("Score actuel :", scores[perso][categorie]);
        winners[categorie].avg = Math.max(winners[categorie].avg, scores[perso][categorie].score);
        if (scores[perso][categorie].score==winners[categorie].avg){
          winners[categorie].perso=perso;
        }
      }
    }
    console.log("Fin du for");
    let result = {
      winners: winners,
      details:details
    }
    console.log(result);
    return res.status(200).json({stats : result});
  }catch(error){
    return res.status(500);
  }
})

module.exports = router;

async function getIndividus() {
  const tab = [
    "Personne âgée",
    "Enfant",
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


function initScore(){
  console.log("Init du score");
  return {
    enfant : {
      risk:{
        score : 0, count : 0
      },
      reward:{
        score : 0, count : 0
      },
      effort:{
        score : 0, count : 0
      }
    },

    robot : {
      risk:{
      score : 0, count : 0
    },
      reward:{
        score : 0, count : 0
      },
      effort:{
        score : 0, count : 0
      }
    },

    hommeGrand : {
      risk:{
        score : 0, count : 0
      },
      reward:{
        score : 0, count : 0
      },
      effort:{
        score : 0, count : 0
      }
    },

    hommePetit : {
      risk:{
        score : 0, count : 0
      },
      reward:{
        score : 0, count : 0
      },
      effort:{
        score : 0, count : 0
      }
    },
    
    femmeGrande : {
      risk:{
        score : 0, count : 0
      },
      reward:{
        score : 0, count : 0
      },
      effort:{
        score : 0, count : 0
      }
    },

    femmePetite : {
      risk:{
        score : 0, count : 0
      },
      reward:{
        score : 0, count : 0
      },
      effort:{
        score : 0, count : 0
      }
    },
    vieux : {
      risk:{
        score : 0, count : 0
      },
      reward:{
        score : 0, count : 0
      },
      effort:{
        score : 0, count : 0
      }
    }
  };
}
