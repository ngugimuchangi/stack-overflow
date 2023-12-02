const { Schema } = require('mongoose');

const Comment = new Schema(
  {
    text: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    votes: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

module.exports = Comment;
