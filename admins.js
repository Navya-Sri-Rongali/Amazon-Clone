const mongoose = require("mongoose");
let admins = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("admins", admins); //first arg is model name,second is schema name
