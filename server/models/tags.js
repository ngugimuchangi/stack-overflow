const { Model, Schema } = require('mongoose');

// Tag schema
const Tag = new Schema({
  name: { type: String, required: true, unique: true },
});

const TagModel = new Model('Tags', Tag);
module.exports = TagModel;
