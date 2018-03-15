const mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

const ShopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }, 
  yearOpened: {
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
  rank: {
    type: Number,
    default: 0
  },
  clients: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Client'
  }],
  artists: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Artist'
  }],
  agreements:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Agreement'
  }],
  assistants:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Assistant'
  }],
  apprentices:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Apprentice'
  }],
  promos:[{
    type: Object
  }],
  deals:[{
    type: Object
  }],
  rating: {
    type: Number,
    default: 100
  },
  ratings:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Rating'
  }],
  awards:[{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Award'
  }],
  settings:{
    type: Object,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Shop', ShopSchema);