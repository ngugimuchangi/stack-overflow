require('../common/types');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const UserModel = require('../models/users');
const constants = require('../common/constants');

/**
 * Check if user is authorized to perform action
 * @param {Request} req Request object
 * @param {Response} res Response object
 * @param {Next} next Next function
 */
function authorize(req, res, next) {}

module.exports = authorize;
