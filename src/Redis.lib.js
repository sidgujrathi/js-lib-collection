/**
 * Redis Library: Collection of methods related to redis
 * @module 'Redis.lib'
 */

const Redis = require('ioredis');

const { NODE_ENV } = process.env;

const attachErrorhandler = (err) => {
  console.debug('REDIS CONNECT error ', err);
  console.debug('node error', err.lastNodeError);
  process.exit();
};

/**
 * Connects to redis and returs client
 * @returns {Object} client
 */
const getRedisClient = () => {
  let client = null;
  if (NODE_ENV === 'local') {
    console.info(`Connecting to Redis server in ${NODE_ENV} enviroment`);
    client = new Redis(6379, '127.0.0.1');
  } else {
    console.info(`Connecting to Redis server in ${NODE_ENV} enviroment to ${this.AWS_EC_HOST}`);
    client = new Redis(6379, this.AWS_EC_HOST);
  }
  client.on('error', attachErrorhandler);

  return client;
};

module.exports = {
  getRedisClient,
};
