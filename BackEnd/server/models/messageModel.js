const mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

const MessageModel = new mongoose.Schema({
  sender: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },
  message:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default:Date.now()
  }
});

module.exports = mongoose.model('Message', MessageModel);