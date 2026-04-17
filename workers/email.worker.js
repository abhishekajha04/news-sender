const { Worker } = require("bullmq");
const { connection } = require("../config/redis");
const Summary = require("../models/Summary");
const User = require("../models/User"); // ✅ ADD THIS
const { sendEmail } = require("../services/email.service");

new Worker("emailQueue", async job => {
  const { userId } = job.data;

  const user = await User.findById(userId);
  if (!user) return;

  const summaries = await Summary.find({
    category: { $in: user.categories }
  });

  await sendEmail(user.email, summaries);

}, { connection });