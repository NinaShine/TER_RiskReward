const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  textId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Text",
    required: true,
  },
  associationType: {
    type: String,
    enum: ["risk-reward", "risk-effort", "effort-reward"],
    required: true,
  },
  // Personne A
  personAType: {
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
  valueOneA: {
    type: Number,
    required: true,
  },
  valueTwoA: {
    type: Number,
    required: true,
  },
  forceA: {
    type: Number,
    required: true,
  },
  // Personne B
  personBType: {
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
  valueOneB: {
    type: Number,
    required: true,
  },
  valueTwoB: {
    type: Number,
    required: true,
  },
  forceB: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Response", responseSchema);
