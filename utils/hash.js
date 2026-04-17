const crypto = require("crypto");

exports.hash = (text) => {
  return crypto.createHash("md5").update(text).digest("hex");
};