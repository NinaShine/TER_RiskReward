const mongoose = require("mongoose");

const textSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, 
    
    required: true,
  },
  associationType: {
    type: String,
    enum: ["risk-reward", "risk-effort", "effort-reward"],
    required: true,
  },
});
module.exports = mongoose.model("Text", textSchema);
