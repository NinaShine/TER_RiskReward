const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // URL de l'image
    required: true,
  },
  associationType: {
    type: String,
    enum: ["risk-reward", "risk-effort", "effort-reward"], // Types définis
    required: true,

  },
});
module.exports = mongoose.model("Text", textSchema);
