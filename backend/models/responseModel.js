const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  textId: {
    type: mongoose.Schema.Types.ObjectId, // Référence au modèle texte
    required: true,
    ref: "Text",
  },
  valueOne: {
    type: Number,
    required: true,
  },
  valueTwo: {
    type: Number,
    required: true,
  },
  associationType: {
    type: String,
    enum: ["risk-reward", "risk-effort", "effort-reward"], // Types définis
    required: true,
  },
  personType: {
    type: String,
    enum: [
      "vieux pas genré",
      "enfant pas genré",
      "robot",
      "homme petite taille",
      "femme petite taille",
      "homme grande taille",
      "femme grande taille",
    ],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Response", responseSchema);
