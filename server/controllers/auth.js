require('../common/types');

const constants = require('../common/constants');
const jwt = require('jwt-simple');
const User = require('../models/users');
const { jwtOptions } = require('../common/config');

class AuthController {
  /**
   * Authenticate user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  async login(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(constants.HTTP_BAD_REQUEST).json({ message: 'Missing credentials' });

    try {
      const user = await User.findOne({ email });
      console.log(user);
      if (!user) return res.status(constants.HTTP_NOT_FOUND).json({ message: 'User not found' });

      if (!user.isValidPassword(password))
        return res.status(constants.HTTP_UNAUTHORIZED).json({ message: 'Invalid password' });

      const payload = { id: user.id, expire: Date.now() + jwtOptions.expiresIn };
      const token = jwt.encode(payload, jwtOptions.secretOrKey);
      res.status(constants.HTTP_OK).json({ token });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Logout user
   * @param {Request} _req Request object
   * @param {Response} res Response object
   * @param {Next} _next Next function
   */
  logout(_req, res, _next) {
    res.status(constants.HTTP_OK).json({ message: 'Logout successful' });
  }
}

module.exports = new AuthController();
