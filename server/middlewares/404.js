require('../utils/types');

const constants = require('../utils/constants');

/**
 * Custom 404 middleware for unmatched routes
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
function routerNotFound(req, res) {
  if (req.method === 'OPTIONS') {
    if (res.headersSent) return res.end();
    else return res.status(constants.HTTP_NOT_FOUND).json({ error: 'Not found' });
  }
}

module.exports = routerNotFound;
