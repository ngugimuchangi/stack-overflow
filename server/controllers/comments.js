require('../common/types');

const Question = require('../models/questions');
const formatDoc = require('../utils/format-res');
const { HTTP, MIN_REPS, UPVOTE_REPS, DOWNVOTE_REPS } = require('../common/constants');

class CommentsController {
  /**
   * Create comment.
   *
   * This method allows a user to add a comment to an answer. The answer is identified by the answerId parameter.
   * The comment text is specified in the request body. The comment is added to the answer's comments array.
   *
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Next} next - Next function
   *
   * @example
   * Sample request: POST /questions/:questionId/answers/:answerId/comments
   * Sample request body:
   * { "text": "Comment text" }
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "text": "Comment text",
   *  "votes": 0,
   *  "user": {
   *   "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "username": "user1",
   *  "reputation": 0
   *  },
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   *  "updatedAt": "2020-01-02T07:26:02.000Z"
   * }
   *
   */
  async createComment(req, res, next) {
    const { questionId, answerId, text } = req.body;
    const { user } = req;
    const commentProjection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];
    if (!questionId || !answerId || !text)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });

    try {
      const question = await Question.findById(questionId);
      if (!question) {
        return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });
      }

      const answer = question.answers.id(answerId);

      if (!answer) {
        return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });
      }

      const comment = new Comments({ text, user: user._id });
      answer.comments.push(comment);

      await question.save();

      res.status(HTTP.CREATED).json({
        ...formatDoc(comment, commentProjection),
        user: formatDoc(user, userProjection),
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get answer comments
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: GET /questions/1234567890/answers/1234567890/comments?page=2
   * Sample response:
   * [
   *  {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "text": "Comment text",
   *    "votes": 0,
   *    "createdAt": "2020-01-02T07:26:02.000Z",
   *    "updatedAt": "2020-01-02T07:26:02.000Z",
   *    "user": {
   *      "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *      "username": "user1",
   *      "reputation": 0
   *    }
   *  }
   * ]
   */
  async getComments(req, res, next) {
    const { questionId, answerId } = req.params;
    const page = parseInt(req.query.page, 10) || 0;
    const limit = 3;
    const skip = page * limit;
    const commentProjection = ['text', 'user', 'votes', 'createdAt', 'updatedAt'];

    const userProjection = ['_id', 'username', 'reputation'];

    try {
      const question = Question.findById(questionId);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      const answer = question.answers.id(answerId);
      if (!answer) return res.status(HTTP.NOT_FOUND).json({ message: 'Answer not found' });

      let comments = await answer.comments.toObject();
      comments = comments.sort((a, b) => a.createdAt - b.createdAt);
      comments = comments.slice(skip, skip + limit);

      const answerRes = [];

      for (const comment of comments) {
        await comment.populate('user');
        answerRes.push({
          ...formatDoc(comment, commentProjection),
          user: formatDoc(comment.user, userProjection),
        });
      }
      res.status(HTTP.OK).json(answerRes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update comment text.
   *
   * This method allows a user to update the text of a comment. The comment is identified by the commentId
   * parameter. The text is specified in the request body.
   *
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Next} next - Next function
   *
   * @example
   * Sample request: POST /questions/:questionId/answers/:answerId/comments/:commentId
   * Sample request body:
   * { "text": "Updated comment text" }
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "text": "Updated comment text",
   *  "votes": 0,
   *  "user": {
   *     "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "username": "user1",
   *    "reputation": 0
   *  },
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   *  "updatedAt": "2020-01-02T07:26:02.000Z"
   * }
   */
  async updateComment(req, res, next) {
    const { questionId, answerId, commentId } = req.params;
    const { text } = req.body;
    const responseProjection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];

    try {
      const question = await Question.findById(questionId);
      const answer = question.answers.id(answerId);
      const comment = answer.comments.id(commentId);

      comment.text = text;

      await question.save();
      const response = {
        ...formatDoc(comment, responseProjection),
        user: formatDoc(comment.user, userProjection),
      };

      res.status(HTTP.OK).json(response);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete a comment.
   *
   * This method allows a user to delete a comment. The question ID, answer ID, and comment ID are specified in the URL parameters.
   * The comment is removed from the answer's comments array and the question document is saved.
   *
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Next} next - Next function
   *
   * @example
   * Sample request: DELETE /questions/:questionId/answers/:answerId/comments/:commentId
   * Sample response: 204 No Content
   */
  async deleteComment(req, res, next) {
    const { questionId, answerId, commentId } = req.params;

    try {
      const question = await Question.findById(questionId);
      const answer = question.answers.id(answerId);

      answer.comments.id(commentId).remove();

      await question.save();

      res.status(HTTP.NO_CONTENT);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Vote on a comment.
   *
   * This method allows a user to upvote or downvote a comment. The action is specified in the request body.
   * The votes count of the comment and the reputation of the user who added the comment are updated accordingly.
   *
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Next} next - Next function
   *
   * @example
   * Sample request: POST /questions/:questionId/answers/:answerId/comments/:commentId/vote
   *
   * Sample request body:
   * { "action": "upvote" }
   *
   * Sample response:
   * {
   *   "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *   "text": "Comment text",
   *   "votes": 1,
   *   "user": {
   *     "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *     "username": "user1",
   *     "reputation": 5
   *   }
   *  "createdAt": "2020-01-03T06:10:18.610Z",
   *  "updatedAt": "2020-01-03T06:10:18.610Z",
   * }
   *
   */
  async voteComment(req, res, next) {
    const { questionId, answerId, commentId } = req.params;
    const { action } = req.body;
    const { user } = req;
    const responseProjection = ['_id', 'text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];

    if (user.reputation < MIN_REPS)
      return res
        .status(HTTP.UNAUTHORIZED)
        .json({ message: `Needs a minimum of ${MIN_REPS} reputation points to vote` });

    try {
      const question = await Question.findById(questionId);
      const answer = question.answers.id(answerId);
      const comment = answer.comments.id(commentId);
      await comment.populate('user');

      if (action === 'upvote') {
        comment.votes += 1;
        comment.user.reputation += UPVOTE_REPS;
      } else if (action === 'downvote') {
        comment.votes -= 1;
        comment.user.reputation -= DOWNVOTE_REPS;
      } else {
        return res.status(400).json({ message: 'Invalid action' });
      }

      await question.save();
      await comment.user.save();

      const response = {
        ...formatDoc(comment, responseProjection),
        user: formatDoc(comment.user, userProjection),
      };

      res.status(HTTP.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CommentsController();
