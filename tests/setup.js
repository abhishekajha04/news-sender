afterAll(async () => {
  const mongoose = require("mongoose");
  await mongoose.connection.close();
});