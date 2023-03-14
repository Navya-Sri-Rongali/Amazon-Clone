const mongoose = require("mongoose");
let allitems = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productid: {
    type: Number,
    required: true,
  },
  
});
module.exports = mongoose.model("allitems", allitems); //first arg is model name,second is schema name
