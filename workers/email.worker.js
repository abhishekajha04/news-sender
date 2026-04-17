const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const Summary = require("../models/Summary");
const User = require("../models/User");
const { sendEmail } = require("../services/email.service");

console.log("🚀 Email worker started...");

// ✅ Create worker
const worker = new Worker(
  "emailQueue",
  async (job) => {
    console.log("📩 Processing job:", job.id, job.data);

    try {
      const { userId } = job.data;

      const user = await User.findById(userId);
      if (!user) {
        console.log("⚠️ User not found:", userId);
        return;
      }

      const summaries = await Summary.find({
        category: { $in: user.categories },
      });

      if (!summaries.length) {
        console.log("⚠️ No summaries found for user:", user.email);
        return;
      }

      await sendEmail(user.email, summaries);

      console.log(`✅ Email sent to ${user.email}`);
    } catch (err) {
      console.error("❌ Job failed:", err);
      throw err; // important for BullMQ retry
    }
  },
  {
    connection,
    concurrency: 5, // 🔥 process 5 jobs in parallel
  }
);

// ✅ Worker events
worker.on("completed", (job) => {
  console.log(`✅ Job completed: ${job.id}`);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job failed: ${job?.id}`, err.message);
});

worker.on("error", (err) => {
  console.error("❌ Worker error:", err);
});