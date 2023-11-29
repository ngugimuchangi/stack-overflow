const { model, Schema } = require('mongoose');

// Tag schema
const Tag = new Schema({
  name: { type: String, required: true, unique: true },
});

module.exports = model('Tags', Tag);
