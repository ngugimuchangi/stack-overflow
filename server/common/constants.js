const constants = {
  HTTP: {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
  },
  DOC_LIMIT: parseInt(process.env.DOC_LIMIT, 10) || 5,
  MIN_REPS: parseInt(process.env.MIN_REPS, 10) || 50,
  UPVOTE_REPS: parseInt(process.env.MIN_REPS, 10) || 5,
  DOWNVOTE_REPS: parseInt(process.env.MIN_REPS, 10) || -10,
};

module.exports = constants;
