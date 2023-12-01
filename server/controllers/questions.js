require('../common/types');

const Question = require('../models/questions');
const Tag = require('../models/tags');
const { HTTP, DOC_LIMIT, MIN_REPS } = require('../common/constants');
const formatDoc = require('../utils/format-res');

class QuestionController {
  /**
   * Create a new question resource with specified details
   *
   * A user can specify tags for the question. If a tag does not exist, it will be created
   * if the user has enough reputation points.
   *
   * @param {Request} req - Request object
   * @param {Response} res - Response object
   * @param {Next} next - Next function
   */
  async createQuestion(req, res, next) {
    const { title, summary, text, tags } = req.body;
    const { user } = req;
    const userProjection = ['_id', 'username', 'reputation'];
    const questionProjection = ['title', 'summary', 'text', 'tags', 'createdAt', 'updatedAt'];

    if (!title || !summary || !text || !tags)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });

    try {
      const tagDocs = await Promise.all(
        tags.map(async (tag) => {
          let tagDoc = await Tag.findOne({ name: tag });
          if (!tagDoc && user.reputation >= MIN_REPS) {
            tagDoc = new Tag({ name: tag, createdBy: user._id });
            await tagDoc.save();
          }
          return tagDoc;
        })
      );

      const question = new Question({
        title,
        summary,
        text,
        user: user._id,
        tags: tagDocs.map((tagDoc) => tagDoc._id),
      });
      await question.save();

      const questionRes = {
        ...formatDoc(question, questionProjection),
        tags: tagDocs.map((tagDoc) => tagDoc.name),
        user: formatDoc(user, userProjection),
      };
      res.status(HTTP.CREATED).json(questionRes);
    } catch (error) {
      next(error);
    }
  }
  /**
   * Get questions list or question by id
   *
   * If `id` is specified, the question will be returned
   * Else, a list of questions will be returned. If query parameters are specified,
   * i.e `q`(query), `t`(tags), the list will be filtered accordingly.
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: GET /questions
   * Sample response:
   * [
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   * "title": "Question 1",
   * "summary": "Question 1 summary",
   * "text": "Question 1 text",
   * "tags": ["tag1", "tag2"],
   * "createdAt": "2020-01-02T07:26:02.000Z",
   * "updatedAt": "2020-01-02T07:26:02.000Z"
   * },
   */
  async getQuestion(req, res, next) {
    const { q, t } = req.query;
    const page = parseInt(req.query.page) || 0;
    const { id } = req.params;
    const limit = DOC_LIMIT;
    const skip = page * limit;
    const sort = { createdAt: -1 };
    const aggregation = { sort, skip, limit };
    const projection = [
      'title',
      'summary',
      'text',
      'user',
      'tags',
      'createdAt',
      'updatedAt',
      'votes',
    ];
    const match = {};

    if (q) {
      const pattern = new RegExp(q, 'i');
      match.$or = [{ title: pattern }, { summary: pattern }, { text: pattern }];
    }

    if (t) {
      const tags = t.split(';');
      match.tags = { $in: tags };
    }

    try {
      if (id) {
        const question = Question.findById(id, projection);
        if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });
        res.status(HTTP.OK).json(question);
      }
      const questions = await Question.find(match, projection, aggregation);

      const questionRes = questions.map((question) => this.formatQuestionDoc(question));

      return res.status(HTTP.OK).json(questionRes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update question
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: PUT /questions/1234567890
   * Sample request body:
   * {
   * "title": "Question 1",
   * "summary": "Question 1 summary",
   * "text": "Question 1 text",
   * "tags": ["tag1", "tag2"],
   * "votes": 5,
   * "views": 10
   * }
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "title": "Question 1",
   *  "summary": "Question 1 summary",
   *  "text": "Question 1 text",
   *  "tags": ["tag1", "tag2"],
   *  "votes": 5,
   *  "views": 10,
   *  "updatedAt": "2020-01-02T07:26:02.000Z"
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   * }
   */
  async updateQuestion(req, res, next) {
    const { id } = req.params;
    const { title, summary, text, tags, votes, views } = req.body;
    const { user } = req;
    const filter = { _id: id, user: user._id };
    const update = { title, summary, text, tags, votes, views };
    const options = { new: true };
    const projection = [
      'title',
      'summary',
      'text',
      'tags',
      'views',
      'votes',
      'createdAt',
      'updatedAt',
    ];

    try {
      const question = await Question.findOneAndUpdate(filter, update, options, projection);

      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      const questionRes = this.formatQuestionDoc(question);
      res.status(HTTP.OK).json(questionRes);
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
   * Sample request: GET /questions/1234567890/answers?page=0
   * Sample request: GET /questions/1234567890/answers
   * Sample response:
   * [
   * {
   * "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   * "text": "Answer 1",
   * "votes": 5,
   * "createdAt": "2020-01-02T07:26:02.000Z",
   * "updatedAt": "2020-01-02T07:26:02.000Z",
   * "user": {
   * "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   * "username": "user1",
   * "reputation": 0
   * }
   * },]
   *
   */
  async getAnswers(req, res, next) {
    const { id } = req.params;
    const answerProjection = ['text', 'votes', 'createdAt', 'updatedAt'];
    const userProjection = ['_id', 'username', 'reputation'];
    const page = parseInt(req.query.page) || 0;
    const limit = DOC_LIMIT;
    const start = page * limit;
    const end = start + limit;

    try {
      const question = await Question.findById(id);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      const answers = question.answers
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(start, end)
        .map((answer) => {
          answer.populate('ansBy');
          const answerRes = {
            ...formatDoc(answer, projection, answerProjection),
            user: formatDoc(answer.ansBy, userProjection),
          };
          return answerRes;
        });

      res.status(HTTP.OK).json(answers);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Upvote or downvote question
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   */
  async voteQuestion(req, res, next) {
    const { id } = req.params;
    const { user } = req;
    const { action } = req.body;
    const filter = { _id: id };
    const update = action === 'upvote' ? { $inc: { votes: 1 } } : { $inc: { votes: -1 } };
    const userUpdate =
      action === 'upvote'
        ? { $inc: { reputation: UPVOTE_REPS } }
        : { $inc: { reputation: DOWNVOTE_REPS } };
    const options = { new: true };
    const projection = ['title', 'summary', 'text', 'tags', 'createdAt', 'updatedAt'];

    if (user.reputation < MIN_REPS)
      return res
        .status(HTTP.UNAUTHORIZED)
        .json({ message: `Needs a minimum of ${MIN_REPS} reputation points to vote` });
    try {
      const question = await Question.findOneAndUpdate(filter, update, options, projection);

      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      await question.populate('user');
      const askedBy = question.user;
      await User.findByIdAndUpdate({ _id: askedBy._id }, userUpdate);

      const questionRes = this.formatQuestionDoc(question);
      res.status(HTTP.OK).json(questionRes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Delete question by id
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: DELETE /questions/1234567890
   * Sample response: 204 No Content
   */
  async deleteQuestion(req, res, next) {
    const { id } = req.params;
    const { user } = req;
    const filter = { _id: id, user: user._id };
    try {
      const question = await Question.findOneAndDelete(filter);

      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      res.status(HTTP.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }

  /**
   * Format question document
   * @param {Question} question Question document
   * @param {string[]} projection Projection
   */
  formatQuestionDoc(question, projection) {
    const questionRes = projection ? formatDoc(question, projection) : question;
    questionRes.tags = question.tags.map((tag) => tag.name);
    return questionRes;
  }
}

module.exports = new QuestionController();
