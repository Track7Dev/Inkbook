const mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

const AdminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  age: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Admin', AdminSchema);