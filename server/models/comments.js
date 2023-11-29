const { Schema } = require('mongoose');

const Comment = new Schema({
  text: { type: String, required: true },
  com_by: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  com_date_time: { type: Date, default: Date.now },
  votes: { type: Number, default: 0 },
});

module.exports = Comment;
