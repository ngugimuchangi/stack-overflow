require('../common/types');
const Tag = require('../models/tags');
const { HTTP } = require('../common/constants');

class TagsController {
  /**
   * Get all tags created by user
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
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
   * Delete tag by id
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
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
