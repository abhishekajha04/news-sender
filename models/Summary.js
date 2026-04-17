const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
  category: String,
  date: String,
  newsHash: { type: String, index: true },
  summary: String
});

module.exports = mongoose.model("Summary", SummarySchema);