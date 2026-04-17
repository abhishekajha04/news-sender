require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const { globalLimiter, authLimiter } = require("./middleware/ratelimiter");

// ✅ Avoid cron + worker during tests
if (process.env.NODE_ENV !== "test") {
  require("./workers/email.worker");

  require("./cron/news.cron");
  require("./cron/summary.cron");
  require("./cron/scheduler");
}

connectDB();

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

// ✅ Start server only if not testing
if (require.main === module) {
  app.listen(process.env.PORT, () => {
    console.log("Server running");
  });
}

module.exports = app;