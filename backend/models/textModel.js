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
  createdAt: {
    type: Date,
    default: Date.now, // Date de création par défaut
  },
});

module.exports = mongoose.model("Text", textSchema);
