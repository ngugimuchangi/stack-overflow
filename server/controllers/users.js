require('../common/types');

const User = require('../models/users');
const Tag = require('../models/tags');
const { HTTP, DOC_LIMIT } = require('../common/constants');
const formatDoc = require('../utils/format-res');

class UserController {
  /**
   * Get users list or user by id
   *
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: GET /users
   * Sample request: GET /users?page=0
   * Sample request: GET /users?page=1
   * Sample request: GET /users/1234567890
   *
   * Sample response:
   * [
   *  {
   *    "_id": "1234567890",
   *    "email": "email@mail.com"
   *    "username": "user1",
   *    "reputation": 0,
   *    "status": "General"
   *  },
   *  {
   *    "_id": "1234567891",
   *    "email": "mail2@mail.com"
   *    "username": "user2",
   *    "reputation": 0,
   *    "status": "General"
   *  }
   * ]
   *
   */
  async getUsers(req, res, next) {
    const id = req.params.userId;
    const { user } = req;
    const limit = DOC_LIMIT;
    const page = parseInt(req.query.page) || 0;
    const skip = page * limit;
    const projection = ['email', 'username', 'reputation', 'status'];
    const pipeline = { skip, limit };

    if (!user.isAdmin()) return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
    try {
      if (id) {
        const user = await User.findById(id, projection);
        if (!user) return res.status(HTTP.NOT_FOUND).json({ message: 'User not found' });

        res.status(HTTP.OK).json(user);
      } else {
        const users = await User.find({}, projection, pipeline);
        res.status(HTTP.OK).json(users);
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get users list or user by id
   *
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: GET /users/me
   * Sample response:
   *  {
   *    "_id": "1234567890",
   *    "email": "email@mail.com"
   *    "username": "user1",
   *    "reputation": 0,
   *    "status": "General"
   *  }
   */
  getCurrentUser(req, res, _next) {
    const { user } = req;
    const resProps = ['_id', 'email', 'username', 'reputation', 'status'];

    res.status(HTTP.OK).json(formatDoc(user, resProps));
    /**
     * Create new user
     * @param {Request} req Request object
     * @param {Response} res Response object
     * @param {Next} next Next function
     */
  }
  /**
   * Create new user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: POST /users
   * Sample request body:
   * {
   *  "email": "user1@mail.com",
   *  "username": "user1",
   *  "password": "1234"
   * }
   * Sample response:
   * {
   * "_id": "1234567890",
   * "email": "user1@mail.com",
   * "username": "user1",
   * "reputation": 0,
   * "status": "General"
   * }
   */
  async createUser(req, res, next) {
    const resProps = ['_id', 'email', 'username', 'reputation', 'status'];
    const { email, username, password, status } = req.body;
    const statuses = ['General', 'Admin'];

    if (!email || !username || !password)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required user details' });

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res
          .status(HTTP.CONFLICT)
          .json({ message: 'Account with given email address already exists' });

      const user = new User({ email, username, password });
      if (statuses.includes(status)) user.status = status;

      user.hashPassword();
      await user.save();

      res.status(HTTP.CREATED).json(formatDoc(user, resProps));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete user
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: DELETE /users/1234567890
   * Sample response: 204 No Content
   *
   */
  async deleteUser(req, res, next) {
    const id = req.params.userId;
    const { user } = req;

    try {
      if (!user.isAdmin() && user._id.toString() !== id)
        return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });

      const userToDelete = await User.deleteOne({ _id: user._id });

      res.status(HTTP.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
}

const controller = new UserController();
module.exports = controller;
