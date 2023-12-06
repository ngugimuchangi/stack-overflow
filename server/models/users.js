const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');

// User schema
const User = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    status: { type: String, default: 'General', enum: ['General', 'Admin'] },
    reputation: { type: Number, default: 0 },
  },
  {
    timestamps: true,
    methods: {
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
      },
      isValidPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },
      isAdmin() {
        return this.status === 'Admin';
      },
    },
  }
);

module.exports = model('Users', User);
