require('../common/types');

const passport = require('passport');
const { Strategy } = require('passport-jwt');
const { jwtOptions } = require('../common/config');
const User = require('../models/users');
const { HTTP } = require('../common/constants');

// JWT Strategy
const jwtStrategy = new Strategy(jwtOptions, verify);
passport.use(jwtStrategy);

/**
 * Token verification callback
 * @param {object} payload  JWT payload
 * @param {string} payload.id  User id
 * @param {number} payload.expire  Token expiration time
 * @param {Function} done - callback function
 */
async function verify(payload, done) {
  const { id, expire } = payload;
  const now = Date.now();

  if (now >= expire) return done(null, false);

  try {
    const user = await User.findById(id);
    if (user) return done(null, user);
    else return done(null, false);
  } catch (err) {
    return done(err, false);
  }
}

/**
 * Check if user is authorized to perform action
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 */
function authorize(req, res, next) {
  const middleware = passport.authenticate('jwt', { session: false }, function (err, user) {
    if (err) return next(err);
    if (!user) return res.status(HTTP.UNAUTHORIZED).json({ message: 'Unauthorized' });
    req.user = user;
    next();
  });

  middleware(req, res, next);
}

module.exports = authorize;
