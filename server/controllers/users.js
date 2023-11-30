require('../common/types');

const User = require('../models/users');
const constants = require('../common/constants');
const formatDoc = require('../utils/format-res');

class UserController {
  /**
   * Get users list or user by id
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  async getUser(req, res, next) {
    const { id } = req.params;
    const limit = 5;
    const page = parseInt(req.query.page) || 0;
    const skip = page * limit;
    const projection = ['email', 'username', 'reputation', 'status'];
    const pipeline = { skip, limit };

    try {
      if (id) {
        const user = await User.findById(id, projection);
        if (!user) return res.status(constants.HTTP_NOT_FOUND).json({ message: 'User not found' });
        res.status(constants.HTTP_OK).json(user);
      } else {
        const users = await User.find({}, projection, pipeline);
        res.status(constants.HTTP_OK).json(users);
      }
    } catch (err) {
      next(err);
    }
  }

  /**
   * Create new user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  async createUser(req, res, next) {
    const resProps = ['email', 'username', 'reputation', 'status'];
    const { email, username, password, status } = req.body;
    const statuses = ['General', 'Admin'];

    if (!email || !username || !password)
      return res
        .status(constants.HTTP_BAD_REQUEST)
        .json({ message: 'Missing required user details' });

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(constants.HTTP_CONFLICT).json({ message: 'User exists' });

      const user = new User({ email, username, password });
      if (statuses.includes(status)) user.status = status;

      user.hashPassword(password);
      await user.save();

      res.status(constants.HTTP_CREATED).json(formatDoc(user, resProps));
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  async deleteUser(req, res, next) {
    const { id } = req.params;
    const { user } = req;

    try {
      if (user.id !== id && !user.isAdmin())
        return res
          .status(constants.HTTP_UNAUTHORIZED)
          .json({ message: 'You are not authorized to delete this user' });

      const userToDelete = await User.deleteOne({ _id: id });
      if (!userToDelete)
        return res.status(constants.HTTP_NOT_FOUND).json({ message: 'User not found' });

      res.status(constants.HTTP_OK).json({ message: 'User deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}

const controller = new UserController();
module.exports = controller;
