const mongoose = require('mongoose');
let review = new mongoose.Schema({
  taskprovider: {
    type: String,
    required: true,
  },
  taskworker: {
    type: String,
    required: true,
    
  },
  review: {
    type: String,
    required: true,
  },
  
});
module.exports = mongoose.model("review", review);