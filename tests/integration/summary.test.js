require("dotenv").config();
const connectDB = require("../../config/db");
const { generateSummary } = require("../../services/ai.service");
const Summary = require("../../models/Summary");

(async () => {
  console.log("🚀 Testing OpenAI Summary...");

  await connectDB();

  await generateSummary("gold");

  const summary = await Summary.findOne({ category: "gold" });

  console.log("✅ Summary:");
  console.log(summary?.summary);

  process.exit();
})();