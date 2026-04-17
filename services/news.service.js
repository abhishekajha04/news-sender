const axios = require("axios");
const News = require("../models/News");
const { hash } = require("../utils/hash");
const { categorize } = require("../utils/categorize");
const { classifyNewsAI } = require("./classifier.service");

exports.fetchNews = async () => {
  try {
    const res = await axios.get(
      `https://newsapi.org/v2/everything`,
      {
        params: {
          q: "gold OR jewellery OR diamond OR fintech india",
          language: "en",
          sortBy: "publishedAt",
          pageSize: 20,
          apiKey: process.env.NEWS_API_KEY
        }
      }
    );

    const articles = res.data.articles;
    console.log("RAW NEWS:", articles?.length);

    let savedArticles = [];

    for (let article of articles) {
      if (!article.title) continue;

      const h = hash(article.title);

      // ✅ fast duplicate check
      const exists = await News.findOne({ hash: h });
      if (exists) continue;

      // 🧠 Step 1: keyword classification
      let category = categorize(article.title, article.description);

      // 🤖 Step 2: AI fallback (ONLY if weak)
      if (category === "general") {
        category = await classifyNewsAI(
          article.title,
          article.description
        );
      }

      console.log("CATEGORY:", category, "|", article.title);

      const newArticle = await News.create({
        title: article.title,
        description: article.description || "",
        category,
        publishedAt: new Date(article.publishedAt),
        hash: h
      });

      savedArticles.push(newArticle);
    }

    if (savedArticles.length === 0) {
      console.log("⚠️ No new articles saved");

      return [{
        title: "No major updates today",
        description: "Markets remain stable."
      }];
    }

    return savedArticles;

  } catch (error) {
    console.error("News API Error:", error.message);

    return [{
      title: "Error fetching news",
      description: "Try again later."
    }];
  }
};