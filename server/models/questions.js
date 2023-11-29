const { model, Schema } = require('mongoose');
const Answer = require('./answers');

// Question schema
const Question = new Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  text: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  asked_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  question_date_time: { type: Date, default: Date.now },
  answers: [Answer],
  ask_date_time: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
});

module.exports = model('Questions', Question);
