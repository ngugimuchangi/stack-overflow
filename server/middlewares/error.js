require('../common/types');

const constants = require('../common/constants');

/**
 * Custom error handler middleware
 * @param {Error} err Error object
 * @param {Request} _req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 * @returns
 */
function errorHandler(err, _req, res, next) {
  if (err) {
    if (res.headersSent) return next(err);
    else
      return res
        .status(err.status || constants.HTTP_INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
  }
}

module.exports = errorHandler;
