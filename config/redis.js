const IORedis = require("ioredis");
const { Queue } = require("bullmq");

const connection = new IORedis(process.env.REDIS_URL, {
  maxRetriesPerRequest: null // ✅ IMPORTANT FIX
});

const emailQueue = new Queue("emailQueue", { connection });

module.exports = { emailQueue, connection };