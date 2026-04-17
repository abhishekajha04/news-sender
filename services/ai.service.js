const OpenAI = require("openai");
const Summary = require("../models/Summary");
const News = require("../models/News");
const crypto = require("crypto");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.generateSummary = async (category) => {
  const today = new Date().toISOString().split("T")[0];
  const last24 = new Date(Date.now() - 24 * 60 * 60 * 1000);

  try {
    const news = await News.find({
      category,
      publishedAt: { $gte: last24 }
    }).sort({ publishedAt: -1 });

    // ✅ HANDLE LOW DATA
    if (!news || news.length < 2) {
      console.log(`⚠️ Not enough news for ${category}`);

      return {
        category,
        summary: `No major updates in ${category} in the last 24 hours.`
      };
    }

    // ✂️ trim for token optimization
    const trimmed = news.slice(0, 5).map(n => n.title);

    const newsHash = crypto
      .createHash("md5")
      .update(JSON.stringify(trimmed))
      .digest("hex");

    // ✅ CACHE CHECK
    const existing = await Summary.findOne({
      category,
      date: today,
      newsHash
    });

    if (existing) {
      console.log(`✅ Cached summary: ${category}`);

      return {
        category,
        summary: existing.summary
      };
    }

    const prompt = `
Summarize these headlines:

${trimmed.join("\n")}

Return:
- 5 bullet headlines
- 3 insights
- 1 trend
`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 300,
      messages: [{ role: "user", content: prompt }]
    });

    // ✅ SAFE ACCESS (VERY IMPORTANT)
    const summaryText =
      res?.choices?.[0]?.message?.content ||
      "Summary unavailable";

    await Summary.create({
      category,
      date: today,
      summary: summaryText,
      newsHash
    });

    return {
      category,
      summary: summaryText
    };

  } catch (err) {
    console.error("OpenAI Error:", err.message);

    return {
      category,
      summary: "AI summary unavailable."
    };
  }
};