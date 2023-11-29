require('../common/types');

class UserController {
  /**
   * Get users list or user by id
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
  createUser(req, res, next) {}

  /**
   * Delete user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  deleteUser(req, res, next) {}
}

const controller = new UserController();
module.exports = controller;
