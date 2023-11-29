require('../common/types');

class UserController {
  /**
   * Get user details
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  getUser(req, res, next) {}

  /**
   * Create new user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  createUser(req, res) {}

  /**
   * Delete user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  deleteUser(req, res) {}
}

const controller = new UserController();
module.exports = controller;
