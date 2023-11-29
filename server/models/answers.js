const { Schema } = require('mongoose');
const Comment = require('./comments');

// Answer schema
const Answer = new Schema({
  text: { type: String, required: true },
  ans_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  ans_date_time: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
  comments: [Comment],
});

module.exports = Answer;
