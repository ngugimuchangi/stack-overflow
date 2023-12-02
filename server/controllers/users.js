require('../common/types');

const User = require('../models/users');
const Tag = require('../models/tags');
const { HTTP, DOC_LIMIT } = require('../common/constants');
const formatDoc = require('../utils/format-res');

class UserController {
  /**
   * Get users list or user by id
   *
   * @example
   * Sample request: GET /users
   * Sample request: GET /users?page=0
   * Sample request: GET /users?page=1
   * Sample request: GET /users/1234567890
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  async getUser(req, res, next) {
    const id = req.params.userId;
    const { user } = req;
    const limit = DOC_LIMIT;
    const page = parseInt(req.query.page) || 0;
    const skip = page * limit;
    const projection = ['email', 'username', 'reputation', 'status'];
    const pipeline = { skip, limit };

    try {
      const currentUser = await User.findById(user.id);

      if (id && (currentUser.isAdmin() || user.id === id)) {
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
   * "email": "user1@mail.com",
   * "username": "user1",
   * "reputation": 0,
   * "status": "General"
   * }
   */
  async createUser(req, res, next) {
    const resProps = ['email', 'username', 'reputation', 'status'];
    const { email, username, password, status } = req.body;
    const statuses = ['General', 'Admin'];

    if (!email || !username || !password)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required user details' });

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(HTTP.CONFLICT).json({ message: 'User exists' });

      const user = new User({ email, username, password });
      if (statuses.includes(status)) user.status = status;

      user.hashPassword(password);
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
      const currentUser = await User.findById(user.id);
      if (!currentUser || (!user.id !== id && !currentUser.isAdmin()))
        return res
          .status(HTTP.UNAUTHORIZED)
          .json({ message: 'You are not authorized to delete this user' });

      const userToDelete = await User.deleteOne({ _id: id });
      if (!userToDelete) return res.status(HTTP.NOT_FOUND).json({ message: 'User not found' });
      res.status(HTTP.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get user tags along with the count of questions for each tag.
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: GET /users/1234567890/tags
   * Sample response:
   * [
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "name": "tag1",
   *    "questionCount": 10
   *  },
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3f",
   *    "name": "tag2",
   *    "questionCount": 5
   *  }
   * ]
   *
   */
  async getUserTags(req, res, next) {
    const { userId } = req.params;
    try {
      const tags = await Tag.aggregate([
        { $match: { createdBy: userId } },
        {
          $lookup: {
            from: 'questions',
            localField: '_id',
            foreignField: 'tags',
            as: 'questions',
          },
        },
        {
          $project: {
            _id: 1,
            name: 1,
            questionCount: { $size: '$questions' },
          },
        },
      ]);
      res.status(200).json(tags);
    } catch (error) {
      next(error);
    }
  }
}

const controller = new UserController();
module.exports = controller;
