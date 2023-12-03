const { model, Schema } = require('mongoose');

// Tag schema
const Tag = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = model('Tags', Tag);
