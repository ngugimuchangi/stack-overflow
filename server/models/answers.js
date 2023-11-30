const { Schema } = require('mongoose');
const Comment = require('./comments');

// Answer schema
const Answer = new Schema(
  {
    text: { type: String, required: true },
    ansBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    votes: { type: Number, default: 0 },
    comments: [Comment],
  },
  {
    timestamps: true,
  }
);

module.exports = Answer;
