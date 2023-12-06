require('../common/types');
const Tag = require('../models/tags');
const Question = require('../models/questions');
const { HTTP } = require('../common/constants');

class TagsController {
  /**
   * Get all tags along with the count of questions for each tag.
   *
   * @param {Request} _req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: GET /tags
   * Sample response:
   * [
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "name": "tag1",
   *    "createdAt": "2020-01-02T07:26:02.000Z",
   *    "updatedAt": "2020-01-02T07:26:02.000Z",
   *    "questionCount": 10
   *  },
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3f",
   *    "name": "tag2",
   *    "createdAt": "2020-01-02T07:26:02.000Z",
   *    "updatedAt": "2020-01-02T07:26:02.000Z",
   *    "questionCount": 5
   *  }
   * ]
   *
   */

  async getAllTags(_req, res, next) {
    const pipeline = [
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
          createdAt: 1,
          updatedAt: 1,
          questionCount: { $size: '$questions' },
        },
      },
    ];

    try {
      const tags = await Tag.aggregate(pipeline);
      res.status(HTTP.OK).json(tags);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all tags created by user along with the count of questions for each tag.
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: GET /tags
   * Sample response:
   * [
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "name": "tag1",
   *    "createdAt": "2020-01-02T07:26:02.000Z",
   *    "updatedAt": "2020-01-02T07:26:02.000Z",
   *    "questionCount": 10
   *  },
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3f",
   *    "name": "tag2",
   *    "createdAt": "2020-01-02T07:26:02.000Z",
   *    "updatedAt": "2020-01-02T07:26:02.000Z",
   *    "questionCount": 5
   *  }
   * ]
   *
   */
  async getUserTags(req, res, next) {
    const { user } = req;
    const filter = { createdBy: user._id };
    const pipeline = [
      {
        $match: filter,
      },
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
          createdAt: 1,
          updatedAt: 1,
          questionCount: { $size: '$questions' },
        },
      },
    ];

    try {
      const tags = await Tag.aggregate(pipeline);

      res.status(HTTP.OK).json(tags);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete tag by id and remove it from all questions.
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   *
   * @example
   * Sample request: DELETE /tags/5e0f0f6a8b40fc1b8c3b9f3e
   * Sample response: 204 No Content
   */
  async deleteTag(req, res, next) {
    const { user } = req;
    const { tagId } = req.params;
    const filter = { _id: tagId, createdBy: user._id };

    try {
      const tag = await Tag.findOne(filter);
      if (!tag) return res.status(HTTP.NOT_FOUND).json({ message: 'Tag not found' });

      await Question.updateMany({ tags: tag._id }, { $pull: { tags: tag._id } });

      await Tag.deleteOne(filter);

      res.status(HTTP.NO_CONTENT).end();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TagsController();
