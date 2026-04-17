require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { globalLimiter, authLimiter } = require("./middleware/ratelimiter");

const app = express();
app.use(express.json());

// ✅ Rate limiters
app.use(globalLimiter);
app.use("/auth", authLimiter);

// ✅ Routes
app.use("/auth", require("./routes/auth.routes"));
app.use("/user", require("./routes/user.routes"));

// ✅ Health check
app.get("/", (req, res) => {
  res.send("API is running ✅");
});

// ✅ Start server
const startServer = async () => {
  try {
    // 🔥 Connect DB first
    await connectDB();
    console.log("✅ MongoDB connected");

    // 🔥 Start background services AFTER DB
    if (process.env.NODE_ENV !== "test") {
      console.log("🚀 Initializing background services...");

      require("./workers/email.worker");
      require("./cron/news.cron");
      require("./cron/summary.cron");
      require("./cron/scheduler");
    }

    const PORT = process.env.PORT || 5000;

    // 🔥 IMPORTANT FIX: bind to 0.0.0.0
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server running on port ${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
};

// ✅ Only start if not imported (test-safe)
if (require.main === module) {
  startServer();
}

module.exports = app;