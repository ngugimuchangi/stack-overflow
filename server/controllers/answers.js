const Answer = require('../models/answers');
const Question = require('../models/questions');
const { HTTP, MIN_REPS, UPVOTE_REPS, DOWNVOTE_REPS } = require('../common/constants');

class AnswersController {
  /**
   * Create answer
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: POST /answers
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
    const { questionId, text } = req.body;
    const { user } = req;
    const answerProjection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];
    if (!questionId || !text)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });
    try {
      const question = await Question.findById(questionId);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      const answer = new Answer({ text, ansBy: user._id });
      question.answers.push(answer);

      await question.save();

      const answerRes = {
        ...formatDoc(answer, answerProjection),
        ansBy: formatDoc(user, userProjection),
      };
      res.status(HTTP.CREATED).json(answerRes);
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
   * Sample request: PUT /answers/1234567890
   * Sample request body:
   * {
   *  "questionId": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "text": "Updated answer text"
   * }
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
    const { answerId } = req.params;
    const { questionId, text } = req.body;
    const { user } = req;
    const filter = { _id: questionId, 'answers._id': answerId, 'answers.ansBy': user._id };
    const update = { $set: { 'answers.$.text': text } };
    const options = { new: true };
    const projection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];

    if (!questionId || !text)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });

    try {
      const question = await Question.findOneAndUpdate(filter, update, options, projection);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      const answerRes = {
        ...formatDoc(question.answers[0], projection),
        ansBy: formatDoc(user, userProjection),
      };
      res.status(HTTP.OK).json(answerRes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Upvote or downvote answer.
   *
   *  If action is upvote, increment answer votes by 1 and user reputation by 5.
   * If action is downvote, decrement answer votes by 1 and user reputation by 10.
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: PUT /answers/1234567890/vote
   * Sample request body:
   * {
   * "questionId": "5e0f0f6a8b40fc1b8c3b9f3e",
   * "action": "upvote"
   * }
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "text": "Answer text",
   *  "votes": 5,
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   *  "updatedAt": "2020-01-02T07:26:02.000Z",
   *  "ansBy": {
   *     "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "username": "user1",
   *   "reputation": 0
   *  }
   * }
   */
  async voteAnswer(req, res, next) {
    const { answerId } = req.params;
    const { questionId, action } = req.body;
    const { user } = req;
    const filter = { _id: questionId, 'answers._id': answerId };
    const update =
      action === 'upvote'
        ? { $inc: { 'answers.$.votes': 1 } }
        : { $inc: { 'answers.$.votes': -1 } };
    const userUpdate =
      action === 'upvote'
        ? { $inc: { reputation: UPVOTE_REPS } }
        : { $inc: { reputation: DOWNVOTE_REPS } };
    const options = { new: true };
    const projection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];

    if (user.reputation < MIN_REPS)
      return res
        .status(HTTP.UNAUTHORIZED)
        .json({ message: `Needs a minimum of ${MIN_REPS} reputation points to vote` });

    try {
      const question = await Question.findOneAndUpdate(filter, update, options, projection);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      await question.populate('user');
      const askedBy = question.user;
      await User.findByIdAndUpdate({ _id: askedBy._id }, userUpdate);

      const answerRes = {
        ...formatDoc(question.answers[0], projection),
        ansBy: formatDoc(user, userProjection),
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
   * Sample request: DELETE /answers/1234567890
   * Sample response: 204 No Content
   */
  async deleteAnswer(req, res, next) {
    const { questionId, answerId } = req.params;
    const { user } = req;
    const filter = { _id: questionId, 'answers._id': answerId, 'answers.ansBy': user._id };

    try {
      const question = await Question.findOneAndUpdate(filter, {
        $pull: { answers: { _id: answerId } },
      });

      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      res.status(HTTP.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AnswersController();
