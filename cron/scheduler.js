const cron = require("node-cron");
const User = require("../models/User");
const { emailQueue } = require("../config/redis");
const moment = require("moment-timezone");

cron.schedule("* * * * *", async () => {
  const users = await User.find({
  deliveryTime: moment().format("HH:mm")
});

  for (let user of users) {
    const userTime = moment().tz(user.timezone).format("HH:mm");

    if (userTime === user.deliveryTime) {
      await emailQueue.add("sendEmail", { userId: user._id });
    }
  }
});