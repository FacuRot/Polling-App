const mongoose = require("mongoose");

const CarrozaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  curso: {
    type: String,
    required: true
  },
  votos: {
    type: Number,
    default: 0
  }
});

module.exports = Carroza = mongoose.model("carroza", CarrozaSchema);
