/**
 * ENV Library: Colletction of generic enviroment manipulation functions
 * @module 'Env.lib'
 */

const dotenv = require('dotenv');

/**
 * @ignore
 * Check all provided variables
 * @param {Array<String>} variables - Array of enviroment variables to check
 */
const isAllEnvValid = (variables) => variables.includes(undefined);

/**
 * Check if .env is present
 */
const checkDotEnv = () => {
  const envFound = dotenv.config();
  if (envFound.error) {
    // This error should crash whole process

    if (process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'staging') {
      console.error("⚠️  Couldn't find .env file  ⚠️");
      process.exit(0);
    }
  }
};

/**
 * Get JWT varaibles to encode & decode token
 * @returns {Object} JWT
 */
const getJWTEnv = () => {
  const { JWT_SECRET, JWT_EXPIRATION_TIME, JWT_ISSUER } = process.env;

  if (isAllEnvValid([JWT_SECRET, JWT_EXPIRATION_TIME, JWT_ISSUER])) {
    return {
      JWT: {
        secret: JWT_SECRET,
        expirationTime: JWT_EXPIRATION_TIME,
        issuer: JWT_ISSUER,
      },
    };
  }

  return console.error("⚠️  Couldn't find JWT varaibles in .env file  ⚠️");
};

/**
 * Get Redis env variables
 * @returns {Object} REDIS
 */
const getRedisEnv = () => {
  const { REDIS_HOST, REDIS_PORT } = process.env;
  if (isAllEnvValid([REDIS_PORT, REDIS_HOST])) {
    return {
      REDIS: {
        port: REDIS_PORT,
        host: REDIS_HOST,
      },
    };
  }

  return console.error("⚠️  Couldn't find REDIS varaibles in .env file  ⚠️");
};

module.exports = {
  checkDotEnv,
  getJWTEnv,
  getRedisEnv,
};
