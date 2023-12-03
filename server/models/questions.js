const { model, Schema } = require('mongoose');
const Answer = require('./answers');

// Question schema
const Question = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    summary: { type: String, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: 'Tags' }],
    user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    answers: [Answer],
    views: { type: Number, default: 0 },
    votes: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Questions', Question);
