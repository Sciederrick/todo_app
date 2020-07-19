const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  title: {type: String, required: true},
  datetime: Date,
  completed: Boolean
}, {timestamp: true, _id: true, autoIndex: true });

//Model
module.exports = mongoose.model('Todo', todoSchema);
