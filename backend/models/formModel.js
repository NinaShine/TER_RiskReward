const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  nationalite: {
    type: String,
    required: true,
  },
  niveauEtudes: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true, // ou true, selon tes besoins
  },
});
module.exports = mongoose.model("Form", formSchema);
