require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { globalLimiter, authLimiter } = require("./middleware/ratelimiter");

// 🔥 Init app
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

// ✅ Start infra (only if not testing)
if (process.env.NODE_ENV !== "test") {
  console.log("🚀 Initializing background services...");

  // Worker
  require("./workers/email.worker");

  // Cron jobs
  require("./cron/news.cron");
  require("./cron/summary.cron");
  require("./cron/scheduler");
}

// ✅ Connect DB
connectDB();

// ✅ Start server
if (require.main === module) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
}

module.exports = app;