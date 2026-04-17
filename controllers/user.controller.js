const User = require("../models/User");

exports.updatePreferences = async (req, res) => {
  const { categories, deliveryTime } = req.body;

  if (categories.length > 10) {
    return res.status(400).send("Max 10 categories");
  }

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { categories, deliveryTime },
    { new: true }
  );

  res.json(user);
};