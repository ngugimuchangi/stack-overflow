require('../common/types');
const formatDoc = require('../utils/format-res');
const Question = require('../models/questions');
const User = require('../models/users');
const { HTTP, DOC_LIMIT, MIN_REPS, DOWNVOTE_REPS, UPVOTE_REPS } = require('../common/constants');
const isSameId = require('../utils/compare-ids');

class AnswersController {
  /**
   * Create answer
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: POST questions/1234567890/answers
   * Sample request body:
   * {
   *  "questionId": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "text": "Answer text"
   * }
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "text": "Answer text",
   *  "votes": 0,
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   *  "updatedAt": "2020-01-02T07:26:02.000Z",
   *  "ansBy": {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "username": "user1",
   *    "reputation": 0
   *  }
   * }
   *
   */
  async createAnswer(req, res, next) {
    const { questionId } = req.params;
    const { text } = req.body;
    const { user } = req;
    const answerProjection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];

    if (!questionId || !text)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });
    try {
      const question = await Question.findById(questionId);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      const answer = { text, ansBy: user._id };
      question.answers.push(answer);

      await question.save();

      const answerRes = {
        ...formatDoc(question.answers[question.answers.length - 1], answerProjection),
        ansBy: formatDoc(user, userProjection),
      };
      res.status(HTTP.CREATED).json(answerRes);
    } catch (err) {
      next(err);
    }
  }
  /**
   * Get answers for a specific question
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: GET /questions/1234567890/answers?p=0
   * Sample request: GET /questions/1234567890/answers
   * Sample response:
   * [
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "text": "Answer 1",
   *    "votes": 5,
   *    "createdAt": "2020-01-02T07:26:02.000Z",
   *    "updatedAt": "2020-01-02T07:26:02.000Z",
   *    "user": {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "username": "user1",
   *    "reputation": 0
   *    }
   *  }
   * ]
   *
   */
  async getAnswers(req, res, next) {
    const { questionId } = req.params;
    const answerProjection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];
    const page = parseInt(req.query.p) || 0;
    const limit = DOC_LIMIT;
    const start = page * limit;
    const end = start + limit;

    try {
      const question = await Question.findById(questionId);

      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      const answers = question.answers
        .sort((answerA, answerB) => answerB.createdAt - answerA.createdAt)
        .slice(start, end);

      const answersRes = await Promise.all(
        answers.map(async (answer) => {
          const answerRes = {
            ...formatDoc(answer, answerProjection),
            user: await formatDoc(await User.findById(answer.ansBy), userProjection),
          };
          return answerRes;
        })
      );

      res.status(HTTP.OK).json(answersRes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update answer
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: PUT /questions/1234567890/answers/1234567890
   * Sample request body:
   * {
   *  "action": "update",
   *  "text": "Updated answer text"
   * }
   * Sample request body:
   * {
   * "action": "upvote"
   * }
   *
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "text": "Updated answer text",
   *  "votes": 0,
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   *  }
   *  "updatedAt": "2020-01-02T07:26:02.000Z",
   *  "ansBy": {
   *     "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "username": "user1",
   *    "reputation": 0
   *  }
   */
  async updateAnswer(req, res, next) {
    const { questionId, answerId } = req.params;
    const { text, action } = req.body;
    const { user } = req;
    const projection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];

    try {
      const question = await Question.findById(questionId);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      const answer = question.answers.id(answerId);
      if (!answer) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      const answeredBy = await User.findById(answer.ansBy);

      if (action === 'update') {
        if (!text) return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });
        else if (!isSameId(answer.ansBy, user._id))
          return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
        else answer.text = text;
      } else if (action === 'upvote') {
        if (user.reputation < MIN_REPS)
          return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
        else {
          answer.votes += 1;
          answeredBy.reputation += UPVOTE_REPS;
        }
      } else if (action === 'downvote') {
        if (user.reputation < MIN_REPS)
          return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
        else {
          answer.votes -= 1;
          answeredBy.reputation -= DOWNVOTE_REPS;
        }
      } else {
        return res.status(HTTP.BAD_REQUEST).json({ message: 'Invalid action' });
      }

      await question.save();
      await answeredBy.save();

      const answerRes = {
        ...formatDoc(answer, projection),
        ansBy: formatDoc(answeredBy, userProjection),
      };
      res.status(HTTP.OK).json(answerRes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete answer
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: DELETE /questions/1234567890/answers/1234567890
   * Sample response: 204 No Content
   */
  async deleteAnswer(req, res, next) {
    const { questionId, answerId } = req.params;
    const { user } = req;

    try {
      const question = await Question.findById(questionId);

      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      if (!isSameId(question.user, user._id))
        return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });

      const answer = question.answers.id(answerId);

      if (!answer) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      if (!isSameId(answer.ansBy, user._id))
        return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });

      await question.updateOne({ $pull: { answers: { _id: answerId } } });

      res.status(HTTP.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AnswersController();
