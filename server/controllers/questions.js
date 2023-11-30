require('../common/types');

const { Question } = require('../models/question');
const { Answer } = require('../models/answer');
const { User } = require('../models/user');
const { Tag } = require('../models/tags');
const constants = require('../common/constants');
const formatDoc = require('../utils/format-res');

class QuestionController {
  /**
   * Create a new question
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Next} next - Next function
   */

  async createQuestion(req, res, next) {
    const { title, summary, text, tags } = req.body;
    const { user } = req;

    try {
      // Find or create the tags
      const tagDocs = await Promise.all(
        tags.map(async (tag) => {
          let tagDoc = await Tag.findOne({ name: tag });

          if (!tagDoc) {
            tagDoc = new Tag({ name: tag });
            await tagDoc.save();
          }

          return tagDoc;
        })
      );

      // Create a new question
      const question = new Question({
        title,
        summary,
        text,
        user: user._id,
        tags: tagDocs.map((tagDoc) => tagDoc._id),
      });

      // Save the question
      await question.save();

      // Format the question resource response
      const questionResource = {
        ...question.toObject(),
        tags: tagDocs.map((tagDoc) => tagDoc.toObject()),
        user: user.toObject(),
      };
      // Send the question back in the response
      res.status(constants.HTTP_CREATED).json(questionResource);
    } catch (error) {
      // Pass the error to the error handling middleware
      next(error);
    }
  }
  async getQuestion(req, res, next) {}

  async deleteQuestion(req, res, next) {}

  async updateQuestion(req, res, next) {}

  async getAnswers(req, res, next) {}
  async createAnswer(req, res, next) {}
  async deleteAnswer(req, res, next) {}
  async updateAnswer(req, res, next) {}
}

module.exports = new QuestionController();
