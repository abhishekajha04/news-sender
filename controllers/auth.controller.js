const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hash });

  res.json(user);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const valid = await bcrypt.compare(password, user.password);
  if (!user) return res.status(404).send("User not found");

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
};