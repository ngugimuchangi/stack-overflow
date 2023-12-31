require('../common/types');

const { HTTP } = require('../common/constants');

/**
 * Custom 404 middleware for unmatched routes
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
function routerNotFound(req, res) {
  if (req.method.toUpperCase === 'OPTIONS') return res.end();
  else return res.status(HTTP.NOT_FOUND).json({ error: 'Route not found' });
}

module.exports = routerNotFound;
