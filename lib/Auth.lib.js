/**
 * Auth Library: Colletction of generic authentication and
 * autorization functions
 * @module 'Auth.lib'
 */

const jwt = require('jsonwebtoken')

const {
  expirationTime: expiresIn,
  issuer,
  secret,
} = process.env;

/**
 * Generates a generic JWT for this application
 * @param {Object} payload - payload to be encrypted
 * @param {Object} options - options for `jwt.sign` method
 * @returns String
 */
const generateToken = (payload = {}, options = {}) => {
  const JWTOptions = options;
  JWTOptions.expiresIn = JWTOptions.expiresIn || expiresIn;
  JWTOptions.issuer = JWTOptions.issuer || issuer;

  return jwt.sign(payload, secret, options);
};

/**
 * Validates provided token
 * @param {String} token - JWT to check
 * @returns Object
 */
const verifyUserToken = (token) => {
  const options = {
    issuer,
  };

  return jwt.verify(token, secret, options);
};

module.exports = {
  generateToken,
  verifyUserToken,
};
