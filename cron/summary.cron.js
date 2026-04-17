const cron = require("node-cron");
const News = require("../models/News");
const { generateSummary } = require("../services/ai.service");

cron.schedule("0 19 * * *", async () => {
  console.log("🚀 Generating summaries...");

  const last24 = new Date(Date.now() - 24 * 60 * 60 * 1000);

  // ✅ ONLY active categories (BIG COST SAVER)
  const activeCategories = await News.distinct("category", {
    publishedAt: { $gte: last24 }
  });

  console.log("Active categories:", activeCategories);

  const chunkSize = 5;

  for (let i = 0; i < activeCategories.length; i += chunkSize) {
    const batch = activeCategories.slice(i, i + chunkSize);

    await Promise.all(
      batch.map(cat => generateSummary(cat))
    );
  }

  console.log("✅ All summaries generated");
});