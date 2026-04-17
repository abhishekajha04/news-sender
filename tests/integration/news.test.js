require("dotenv").config();
const connectDB = require("../../config/db");
const { fetchNews } = require("../../services/news.service");
const News = require("../../models/News");

(async () => {
  console.log("🚀 Testing News API...");

  await connectDB();

  await fetchNews();

  const news = await News.find().sort({ createdAt: -1 }).limit(5);

  console.log("✅ Latest News:");
  news.forEach(n => {
    console.log("-", n.title);
  });

  process.exit();
})();