require('../common/types');

const constants = require('../common/constants');
const User = require('../models/users');

class AuthController {
  /**
   * Authenticate user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  login(req, res, next) {}

  /**
   * Logout user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  logout(req, res, next) {}
}

module.exports = new AuthController();
