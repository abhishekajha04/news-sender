require("dotenv").config();

const connectDB = require("../../config/db");
const { generateSummary } = require("../../services/ai.service");
const News = require("../../models/News");

(async () => {
  console.log("🚀 Testing OpenAI Summary...");

  await connectDB();

  // ✅ Get real categories from DB
  const categories = await News.distinct("category");

  console.log("Available categories:", categories);

  if (!categories.length) {
    console.log("❌ No categories found. Run news test first.");
    process.exit();
  }

  // ✅ Pick a REAL category
  const testCategory = categories[0];

  console.log("Testing category:", testCategory);

  const result = await generateSummary(testCategory);

  console.log("✅ Summary:");
  console.log(result.summary);

  process.exit();
})();