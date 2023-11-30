require('../common/types');

const constants = require('../common/constants');

/**
 * Custom 404 middleware for unmatched routes
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
function routerNotFound(req, res) {
  console.log('Passed here', req.method);
  if (req.method.toUpperCase === 'OPTIONS') return res.end();
  else return res.status(constants.HTTP_NOT_FOUND).json({ error: 'Route not found' });
}

module.exports = routerNotFound;
