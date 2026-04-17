require("dotenv").config();
const connectDB = require("../../config/db");

const { fetchNews } = require("../../services/news.service");
const { generateSummary } = require("../../services/ai.service");
const { sendEmail } = require("../../services/email.service");

(async () => {
  console.log("🚀 Testing FULL PIPELINE...");

  await connectDB();

  console.log("1️⃣ Fetching news...");
  await fetchNews();

  console.log("2️⃣ Generating summary...");
  await generateSummary("gold");

  console.log("3️⃣ Sending email...");
  await sendEmail("abhishek.ajha04@gmail.com", [
    {
      category: "gold",
      summary: "Pipeline test successful 🚀"
    }
  ]);

  console.log("✅ FULL SYSTEM WORKING");

  process.exit();
})();