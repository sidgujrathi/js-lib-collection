/**
 * APICache Library: A library helps to cache API response and return same from Redis
 * @module 'ApiCache.lib'
 */

// Time in millisecond to convert time param provided
const timeInMilliseconds = {
  ms: 1,
  second: 1000,
  minute: 60000,
  hour: 3600000,
  day: 3600000 * 24,
  week: 3600000 * 24 * 7,
  month: 3600000 * 24 * 30,
};

function ApiCache() {
  const globalOptions = {
    debug: false,
    redisClient: null,
    defaultDuration: 3600000,
  };

  const instance = this;

  /**
   * Checks if redis client is set
   */
  this.checkRedisClient = () => {
    if (!globalOptions.redisClient) {
      throw Error('Redis Client is not set!');
    }
  };

  /**
   * Sets global options for lib
   * @param {Object} options
   * @param {Object} options.redisClient
   * @param {Boolean} options.debug
   * @param {Number} options.defaultDuration
   */
  this.setOptions = (options) => {
    if (options) {
      Object.assign(globalOptions, options);
    }

    return this;
  };

  /**
   * Checks if provided data is already JSON string or not
   * @param {String} jsonString
   * @returns {Boolean}
   */
  function isJsonParsable(jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (err) {
      return false;
    }
  }

  /**
   * Logs arguments on terminal
   * @param  {...any} logArgs
   */
  function debug(...logArgs) {
    logArgs.unshift('\x1b[36m[apicache]\x1b[0m');
    // Check if debug set in enviroment variable
    const debugEnv = process.env.DEBUG && process.env.DEBUG.split(',').indexOf('apicache') !== -1;

    return (globalOptions.debug || debugEnv) && console.log.apply(null, logArgs);
  }

  /**
   * Parse string duration to milliseconds
   * @param {String | Number} duration
   * @param {Number} defaultDuration
   * @returns {Number}
   */
  function parseDuration(duration, defaultDuration) {
    // Return if provided milliseconds
    if (typeof duration === 'number') return duration;

    if (typeof duration === 'string') {
      // Split duration to parts to get length, unit
      // eslint-disable-next-line no-useless-escape
      const split = duration.match(/^([\d\.,]+)\s?(\w+)$/);

      if (split.length === 3) {
        const len = parseFloat(split[1]);
        let unit = split[2].replace(/s$/i, '').toLowerCase();
        if (unit === 'm') {
          unit = 'ms';
        }

        return (len || 1) * (timeInMilliseconds[unit] || 0);
      }
    }

    return defaultDuration;
  }

  this.getDuration = (duration) => parseDuration(duration, globalOptions.defaultDuration);

  /**
   * Sends response from cache
   * @param {Object} request
   * @param {Object} response
   * @param {Object} cacheObject
   */
  function sendCachedResponse(request, response, cacheObject) {
    debug('Setting no-cache headers');
    // Add cache control headers
    response.setHeader('cache-control', 'no-cache, no-store, must-revalidate');

    // unstringify json string response
    let { data } = cacheObject;
    const { status } = cacheObject;
    if (data && typeof data === 'string') {
      data = isJsonParsable(data) ? JSON.parse(data) : data;
    }

    debug('Sending parsed response for key');

    return response.status(status).send(data);
  }

  /**
   * Creates cache object to store in Redis
   * @param {Number} status
   * @param {Array<String>} headers
   * @param {Object | Array<Object>} data
   * @param {String} encoding
   */
  function createCacheObject(status, data) {
    return {
      status,
      data: isJsonParsable(data) ? JSON.parse(data) : data,
    };
  }

  /**
   * Cache content to redis with expiry
   * @param {String} key
   * @param {*} value
   * @param {Number} duration
   */
  function cacheResponse(key, value, duration) {
    const redis = globalOptions.redisClient;
    try {
      redis.hset(key, 'response', JSON.stringify(value));
      redis.hset(key, 'duration', duration);
      redis.expire(key, duration / 1000, () => { });

      debug(`Response cached for key ${key}`);
    } catch (err) {
      debug('[apicache] error in redis.hset()');
    }
  }

  /**
   * Overwrites response methods to make response cachable
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * @param {String} key
   * @param {Number} duration
   */
  function makeResponseCacheable(req, res, next, key, duration) {
    debug(`Making response cachable for key: ${key}`);
    // Patch res.send to cache response data to redis
    const originalSend = res.send;
    res.send = (responseContent) => {
      const cacheObject = createCacheObject(res.statusCode, responseContent);
      cacheResponse(key, cacheObject, duration);

      // eslint-disable-next-line prefer-rest-params
      return originalSend.apply(res, arguments);
    };

    next();
  }

  /**
   * Function to return middleware to get/set cached response
   * @param {String | Number} cacheDuration
   */
  this.middleware = (cacheDuration) => {
    instance.checkRedisClient();

    // Parse string duration to milliseconds
    const duration = instance.getDuration(cacheDuration);

    // Clousre middleware function to get/set cached response
    // eslint-disable-next-line consistent-return
    return function apiCacheMiddleware(req, res, next) {
      function bypass() {
        debug('bypass detected, skipping cache.');
        return next();
      }

      // Check if request header explicitly asking for no caching
      if (req.headers['x-apicache-bypass'] || req.headers['x-apicache-force-fetch']) {
        return bypass();
      }

      const cacheKey = req.originalUrl || req.url;
      const redis = globalOptions.redisClient;
      try {
        redis.hgetall(cacheKey, (err, obj) => {
          if (!err && obj && obj.response) {
            debug('sending cached (redis) version of', cacheKey);

            return sendCachedResponse(req, res, JSON.parse(obj.response));
          }
          return makeResponseCacheable(req, res, next, cacheKey, duration);
        });
      } catch (err) {
        // bypass redis on error
        return makeResponseCacheable(req, res, next, cacheKey, duration);
      }
    };
  };

  /**
   * Clears/Deletes key and data from redis
   * @param {String} target
   */
  this.clear = (target) => {
    instance.checkRedisClient();

    const redis = globalOptions.redisClient;

    if (target) {
      debug(`clearing cached entry for ${target}`);
      try {
        redis.del(target);
      } catch (err) {
        console.log(`[apicache] error in redis.del("${target}")`);
      }
    } else {
      // Clears all entries from redis
      debug('clearing entire index');

      // To Do: clear all entries from redis
    }
  };
}

module.exports = new ApiCache();
