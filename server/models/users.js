const { Model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  status: { type: String, default: 'General', enum: ['General', 'Admin'] },
  reputation: { type: Number, default: 0 },
  methods: {
    hashPassword: function (password) {
      this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    },
    checkPassword: function (password) {
      return bcrypt.compareSync(password, this.password);
    },
  },
});

const UserModel = new Model('Users', User);
module.exports = UserModel;
