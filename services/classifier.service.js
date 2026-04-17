const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const CATEGORIES = [
  "gold","silver","diamonds","jewellery",
  "stock_market","banking","fintech","upi",
  "startups","ai","crypto","real_estate",
  "automobile","energy","ecommerce",
  "indian_economy","government_policy",
  "rbi","tax","marketing","sales",
  "spacetech","defence","climate",
  "healthtech","edtech","media","general"
];

exports.classifyNewsAI = async (title, description) => {
  try {
    const prompt = `
Classify this news into ONE category from the list:

${CATEGORIES.join(", ")}

News:
Title: ${title}
Description: ${description}

Only return category name.
`;

    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 10,
      messages: [{ role: "user", content: prompt }]
    });

    let category = res.choices[0].message.content.trim().toLowerCase();

    // ✅ safety fallback
    if (!CATEGORIES.includes(category)) {
      category = "general";
    }

    return category;

  } catch (err) {
    console.log("AI classify error:", err.message);
    return "general";
  }
};