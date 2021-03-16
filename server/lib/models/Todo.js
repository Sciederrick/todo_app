const mongoose = require('mongoose');

//Schema
const Schema = mongoose.Schema;
const todoSchema = new Schema({
  deadline: Date,
  todos:[
    {
      userId: {type: String, required: true},
      title: {type: String, required: true},
      description: String,
      priority: String,
      tag: String,
      completed: {type: Boolean, default: false}
    }
  ]
}, { timestamp: true, _id: true, autoIndex: true });

//Model
module.exports = mongoose.model('Todo', todoSchema);
