const { ExtractJwt } = require('passport-jwt');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET || 'Shh!SuperSecretStuff',
  expiresIn: parseInt(process.env.EXPIRES_IN, 10) || 3600000,
};

module.exports = { jwtOptions };
