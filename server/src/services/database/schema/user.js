const { Schema } = require("mongoose");

const UserSchema = new Schema({
  email: { type: String, unique: [true, "Email already exist"] },
  name: String,
  pwd: String,
});

module.exports = UserSchema;
