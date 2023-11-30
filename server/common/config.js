const { ExtractJwt } = require('passport-jwt');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'Shh!SuperSecretStuff',
  expiresIn: process.env.EXPIRES || 3600000,
};

module.exports = { jwtOptions };
