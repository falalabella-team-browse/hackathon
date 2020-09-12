const crypto = require("crypto");

const digest = (string) => {
  return crypto
    .createHmac("sha256", process.env.SECRET)
    .update(string)
    .digest("hex");
};

module.exports = { digest };
