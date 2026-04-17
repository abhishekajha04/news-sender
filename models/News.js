const mongoose = require("mongoose");

const NewsSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  publishedAt: Date,
  hash: { type: String, unique: true }
});

module.exports = mongoose.model("News", NewsSchema);