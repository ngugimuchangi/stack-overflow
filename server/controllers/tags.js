require('../common/types');
const Tag = require('../models/tags');
const { HTTP } = require('../common/constants');

class TagsController {
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
  async getTags(req, res, next) {
    const { user } = req;
    const filter = { createdBy: user._id };
    try {
      const tags = await Tag.aggregate([
        { $match: filter },
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
      ]);
      res.status(HTTP.OK).json(tags);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete tag by id
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
      await Tag.deleteOne(filter);
      res.status(HTTP.NO_CONTENT).json();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TagsController();
