require('../common/types');

const Question = require('../models/questions');
const Tag = require('../models/tags');
const isSameId = require('../utils/compare-ids');
const { HTTP, DOC_LIMIT, MIN_REPS, UPVOTE_REPS, DOWNVOTE_REPS } = require('../common/constants');
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
   *
   * @example
   * Sample request: POST /questions
   * Sample request body:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   * "title": "Question 1",
   * "summary": "Question 1 summary",
   * "text": "Question 1 text",
   * "votes": 2,
   * "views": 20,
   * "active": false,
   * "tags": ["tag1", "tag2"]
   * }
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "title": "Question 1",
   *  "summary": "Question 1 summary",
   *  "text": "Question 1 text",
   *  "tags": ["tag1", "tag2"],
   *  "votes": 0,
   *  "views": 0,
   *  "active": true,
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   *  "updatedAt": "2020-01-02T07:26:02.000Z",
   *  "user": {
   *    "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *    "username": "user1",
   *    "reputation": 0
   *  }
   * }
   */
  async createQuestion(req, res, next) {
    const { title, summary, text, tags } = req.body;
    const { user } = req;
    const userProjection = ['_id', 'username', 'reputation'];
    const questionProjection = [
      '_id',
      'title',
      'summary',
      'text',
      'user',
      'tags',
      'createdAt',
      'updatedAt',
      'votes',
      'answers',
      'views',
      'active',
    ];

    if (!title || !summary || !text || !tags)
      return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });

    try {
      const tagDocs = (
        await Promise.all(
          tags.map(async (tag) => {
            let tagDoc = await Tag.findOne({ name: tag });
            if (!tagDoc && user.reputation >= MIN_REPS) {
              tagDoc = new Tag({ name: tag, createdBy: user._id });
              await tagDoc.save();
            }
            return tagDoc;
          })
        )
      ).filter((tagDoc) => tagDoc);

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
        tags: tagDocs.map((tagDoc) => tagDoc?.name),
        user: formatDoc(user, userProjection),
        answers: question.answers.length,
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
   * i.e `q (query)`, `t (tags)`, and `p (page)` the list will be filtered accordingly.
   *
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: GET /questions
   * Sample request query: ?q=question&t=tag1;tag2&p=0
   * Sample response:
   * [
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   * "title": "Question 1",
   * "summary": "Question 1 summary",
   * "text": "Question 1 text",
   * "tags": ["tag1", "tag2"],
   * "votes": 5,
   * "views": 10,
   * "active": true,
   * "createdAt": "2020-01-02T07:26:02.000Z",
   * "updatedAt": "2020-01-02T07:26:02.000Z"
   * },
   */
  async getQuestions(req, res, next) {
    const { q: query, s: status, t } = req.query;
    const page = parseInt(req.query.p) || 0;
    const { questionId } = req.params;
    const limit = DOC_LIMIT;
    const skip = page * limit;
    const sort = { createdAt: -1 };
    const projection = [
      '_id',
      'title',
      'summary',
      'text',
      'user',
      'tags',
      'createdAt',
      'updatedAt',
      'votes',
      'answers',
      'views',
      'active',
    ];
    const userProjection = ['_id', 'username', 'reputation'];
    const match = {};

    if (query) {
      const pattern = new RegExp(query, 'i');
      match.$or = [{ title: pattern }, { summary: pattern }, { text: pattern }];
    }

    if (status) {
      if (status === 'active') match.active = true;
      else if (status === 'inactive') match.active = false;
      else if (status === 'answered') match.answers = { $not: { $size: 0 } };
      else return res.status(HTTP.BAD_REQUEST).json({ message: 'Invalid status' });
    }

    if (t) {
      const tags = t.split(',').map((t) => t.trim().toLowerCase());
      match['tags.name'] = { $in: tags };
    }

    const pipeline = [
      {
        $lookup: {
          from: 'tags',
          localField: 'tags',
          foreignField: '_id',
          as: 'tags',
        },
      },
      {
        $unwind: '$tags',
      },
      {
        $match: match,
      },
      {
        $group: {
          _id: '$_id',
          title: { $first: '$title' },
          summary: { $first: '$summary' },
          text: { $first: '$text' },
          user: { $first: '$user' },
          tags: { $push: '$tags' },
          createdAt: { $first: '$createdAt' },
          updatedAt: { $first: '$updatedAt' },
          votes: { $first: '$votes' },
          answers: { $first: '$answers' },
          views: { $first: '$views' },
          active: { $first: '$active' },
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: '$user',
      },
      {
        $sort: sort,
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: projection.reduce((obj, field) => ({ ...obj, [field]: 1 }), {}),
      },
    ];

    try {
      if (questionId) {
        const question = await Question.findById(questionId, projection);
        if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

        await question.populate({
          path: 'user',
          select: userProjection.join(' '),
        });

        await question.populate({ path: 'tags', select: 'name' });

        const response = {
          ...formatDoc(question, projection),
          tags: question.tags.map((tagDoc) => tagDoc.name),
          answers: question.answers.length,
        };
        return res.status(HTTP.OK).json(response);
      }
      const questions = await Question.aggregate(pipeline);
      const questionRes = questions.map((question) => {
        const formattedRes = {
          ...formatDoc(question, projection),
          tags: question.tags.map((tagDoc) => tagDoc.name),
          user: formatDoc(question.user, userProjection),
          answers: question.answers.length,
        };
        return formattedRes;
      });
      return res.status(HTTP.OK).json(questionRes);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Update question partial by id
   * @param {Request} req Request object
   * @param {Response} res Response object
   * @param {Next} next Next function
   * @example
   * Sample request: PUT /questions/1234567890
   * Sample request body:
   * {
   * "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   * "title": "Question 1",
   * "summary": "Question 1 summary",
   * "text": "Question 1 text",
   * "action": "update"
   * }
   *
   * Sample request body:
   * {
   *  "action": "deactivate"
   * }
   *
   * Sample response:
   * {
   *  "_id": "5e0f0f6a8b40fc1b8c3b9f3e",
   *  "title": "Question 1",
   *  "summary": "Question 1 summary",
   *  "text": "Question 1 text",
   *  "tags": ["tag1", "tag2"],
   *  "votes": 5,
   *  "views": 10,
   *  "active": false,
   *  "updatedAt": "2020-01-02T07:26:02.000Z"
   *  "createdAt": "2020-01-02T07:26:02.000Z",
   * }
   */
  async updateQuestion(req, res, next) {
    const { questionId } = req.params;
    const { title, summary, text, action } = req.body;
    const { user } = req;
    const userProjection = ['_id', 'username', 'reputation'];

    const projection = [
      '_id',
      'title',
      'summary',
      'text',
      'user',
      'tags',
      'votes',
      'answers',
      'views',
      'active',
      'createdAt',
      'updatedAt',
    ];

    try {
      const question = await Question.findById(questionId);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      await question.populate('user');
      const askedBy = question.user;

      if (action === 'update') {
        if (!title && !summary && !text)
          return res.status(HTTP.BAD_REQUEST).json({ message: 'Missing required fields' });
        else if (!isSameId(askedBy._id, user._id))
          return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
        else {
          title && (question.title = title);
          summary && (question.summary = summary);
          text && (question.text = text);
        }
      } else if (action === 'activate' || action === 'deactivate') {
        if (!isSameId(askedBy._id, user._id))
          return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
        question.active = action === 'activate' ? true : false;
      } else if (action === 'upvote') {
        if (user.reputation < MIN_REPS)
          return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
        else {
          question.votes += 1;
          askedBy.reputation += UPVOTE_REPS;
        }
      } else if (action === 'downvote') {
        if (user.reputation < MIN_REPS)
          return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
        else {
          question.votes -= 1;
          askedBy.reputation -= DOWNVOTE_REPS;
        }
      } else if (action === 'view') {
        question.views += 1;
      } else {
        return res.status(HTTP.BAD_REQUEST).json({ message: 'Invalid action' });
      }

      await question.save();
      await askedBy.save();

      const response = {
        ...formatDoc(question, projection),
        user: formatDoc(askedBy, userProjection),
        answers: question.answers.length,
      };

      return res.status(HTTP.OK).json(response);
    } catch (err) {
      next(err);
    }
  }

  async getQuestionsForCurrentUser(req, res, next) {
    const { user } = req;
    const userProjection = ['_id', 'username', 'reputation'];

    const projection = [
      '_id',
      'title',
      'summary',
      'text',
      'user',
      'tags',
      'createdAt',
      'updatedAt',
      'votes',
      'answers',
      'views',
      'active',
    ];
    try {
      const questions = await Question.find({ user: user._id }, projection);

      const questionRes = await Promise.all(
        questions.map(async (question) => {
          await question.populate('user');
          await question.populate('tags');

          const formattedRes = {
            ...formatDoc(question, projection),
            tags: question.tags.map((tagDoc) => tagDoc.name),
            user: formatDoc(question.user, userProjection),
            answers: question.answers.length,
          };
          return formattedRes;
        })
      );

      return res.status(HTTP.OK).json(questionRes);
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
    const { questionId } = req.params;
    const { user } = req;
    const filter = { _id: questionId, user: user._id };
    try {
      const question = await Question.findOneAndDelete(filter);
      if (!question) return res.status(HTTP.NOT_FOUND).json({ message: 'Question not found' });

      res.status(HTTP.NO_CONTENT).end();
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new QuestionController();
