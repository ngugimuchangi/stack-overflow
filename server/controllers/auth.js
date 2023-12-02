require('../common/types');

const { HTTP } = require('../common/constants');
const jwt = require('jwt-simple');
const User = require('../models/users');
const { jwtOptions } = require('../common/config');

class AuthController {
  /**
   * Authenticate user
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: POST /auth/login
   * Sample request body:
   * {
   * "email": "user1@mail.com",
   * "password": "1234"
   * }
   * Sample response:
   * {
   * "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHBpcmUiOjE1Nzg4NjQxMjEzNzcsImlhdCI6MTU3ODg2MjUyMTM3NywiaWQiOiI1ZTAxMjQ0ZjE2YzI1YzAwMTc0MzY4ZTciLCJ1c2VybmFtZSI6InVzZXIxIn0.2fXx8dX8zV6X5Y8B3H1C1Z4JXKb0dZgHl5QqLcJ7b6A"
   * }
   */
  async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing credentials' });

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(HTTP.NOT_FOUND).json({ message: 'User not found' });

      if (!user.isValidPassword(password))
        return res.status(HTTP.UNAUTHORIZED).json({ message: 'Invalid password' });

      const payload = { id: user._id.toString(), expire: Date.now() + jwtOptions.expiresIn };
      console.log(payload);
      const token = jwt.encode(payload, jwtOptions.secretOrKey);
      return res.status(HTTP.OK).json({ token });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Logout user
   * @param {Request} _req Request object
   * @param {Response} res Response object
   * @param {Next} _next Next function
   * @example
   * Sample request: POST /auth/logout
   * Sample response:
   */
  logout(_req, res, _next) {
    res.status(HTTP.NO_CONTENT).end();
  }
}

module.exports = new AuthController();
