require('../common/types');
const Tag = require('../models/tags');
const { HTTP } = require('../common/constants');

class TagsController {
  /**
   * Get all tags created by user
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
   *    "updatedAt": "2020-01-02T07:26:02.000Z"
   *  },
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3f",
   *    "name": "tag2",
   *    "createdAt": "2020-01-02T07:26:02.000Z",
   *    "updatedAt": "2020-01-02T07:26:02.000Z"
   *  }
   * ]
   *
   */
  async getTags(req, res, next) {
    const { user } = req;
    const filter = { createdBy: user._id };
    const projection = ['_id', 'name', 'createdAt', 'updatedAt'];
    try {
      const tags = await Tag.find(filter, projection);
      res.status(20).json(tags);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get the count of questions for each tag.
   *
   * This method returns a list of tags along with the count of questions associated with each tag.
   * The count is determined by performing a lookup on the 'questions' collection and counting the number of matching documents for each tag.
   *
   * @param {Request} _req - The request object. Not used in this method, hence the underscore.
   * @param {Response} res - The response object. Used to send the JSON response.
   * @param {Next} next - The next middleware function in the Express middleware stack.
   *
   * @returns {Promise<void>} - A Promise that resolves when the response has been sent.
   *
   * @example
   * Sample request: GET /tags/count
   * Sample response:
   * [
   *  { "name": "tag2", "questionCount": 3 },
   *  { "name": "tag3", "questionCount": 8 }
   *  { "name": "tag1", "questionCount": 5 },
   * ]
   */
  async getTagCount(_req, res, next) {
    try {
      const tags = await Tag.aggregate([
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
            _id: 0,
            name: 1,
            questionCount: { $size: '$questions' },
          },
        },
      ]);

      res.json(tags);
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
