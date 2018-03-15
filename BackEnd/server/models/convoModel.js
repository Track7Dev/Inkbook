const mongoose = require('mongoose');
mongoose.models = {};
mongoose.modelSchemas = {};

// const ConvoSchema = new mongoose.Schema({
//   to: {
//     type: String,
//     required: true
//   },
//   toStatus: {
//     type: String,
//     required: true
//   },
//   from: {
//     type: String,
//     required: true
//   },
//   fromStatus: {
//     type: String,
//     required: true
//   },
//   messages: [{
//     type: mongoose.SchemaTypes.ObjectId,
//     ref: 'Message'
//   }]
// });

const ConvoSchema = new mongoose.Schema({
  users: {
    type: Array,
    required: true
  },
  messages: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Message',
    required: true
  }]
});

module.exports = mongoose.model('Convo', ConvoSchema);