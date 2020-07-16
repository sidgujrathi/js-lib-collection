const util = require('util');

// Configuration for Util.inspect
const utilInspectConfig = {
  showHidden: false,
  depth: 5,
  maxArrayLength: 25,
  compact: false,
  breakLength: 150,
  colors: false,
  showProxy: false,
};

// Return always the same instance
let instance = null;

// Log levels for console
const logLevels = {
  trace: 'trace',
  debug: 'debug',
  info: 'info',
  warn: 'warn',
  error: 'error',
  fatal: 'fatal',
};

// Log level ordering by priority
const logLevelsOrdering = [
  logLevels.trace,
  logLevels.debug,
  logLevels.info,
  logLevels.warn,
  logLevels.error,
  logLevels.fatal,
];

/**
 * Returns member functions to log debug, error and info messages on console
 */
class Logger {
  constructor() {
    if (!instance) {
      instance = this;
    }
    this.level = logLevels.info;
    this.oldConsole = null;

    return instance;
  }

  restoreConsole() {
    console.log = this.oldConsole;
  }

  /**
   * Log level setter
   * @param {String} level
   */
  setLevel(level) {
    if (logLevelsOrdering.indexOf(level) === -1) {
      this.level = logLevels.info;
    } else {
      this.level = level;
    }
  }

  /**
   * Prints traces the error provided in params
   * @param  {...any} statements
   */
  trace(...statements) {
    this._log(...['trace'].concat(statements));
  }

  /**
   * Prints debug logs
   * @param  {...any} statements
   */
  debug(...statements) {
    this._log(...['debug'].concat(statements));
  }

  /**
   * Prints information logs
   * @param  {...any} statements
   */
  info(...statements) {
    this._log(...['info'].concat(statements));
  }

  /**
   * Prints warning logs
   * @param  {...any} statements
   */
  warn(...statements) {
    this._log(...['warn'].concat(statements));
  }

  /**
   * Prints error logs
   * @param  {...any} statements
   */
  error(...statements) {
    this._log(...['error'].concat(statements));
  }

  /**
   * Prints fatal error logs
   * @param  {...any} statements
   */
  fatal(...statements) {
    this._log(...['fatal'].concat(statements));
  }

  /**
   * Prints stringified form of JSON
   * @param {String | JSON} jsObject
   */
  json(jsObject) {
    try {
      let json = jsObject;
      // If its a string we try to parse it to ensure is a valid object
      if (typeof jsObject === 'string') {
        json = JSON.parse(jsObject);
      }
      console.log(JSON.stringify(json, null, 2));
    } catch (err) {
      this.warn('Failed to log JSON object:', jsObject);
    }
  }

  // Base logger function
  _log(...statements) {
    // Extract logger level
    const logLevel = statements.shift();

    // Check for logger priority
    if (logLevelsOrdering.indexOf(logLevel) >= logLevelsOrdering.indexOf(this.level)) {
      const prefix = `[${logLevel.toUpperCase()}] `;

      for (let i = 0; i < statements.length; i += 1) {
        let line = prefix;

        try {
          // Check the type of data and process it accordingly
          // eslint-disable-next-line eqeqeq
          switch (statements[i] == undefined ? undefined : statements[i].constructor) {
            case Error:
              console.log(`${line}${statements[i].toString()}\n${statements[i].stack}`);
              line = '';
              break;
            case Object:
              console.log(line, statements[i]);
              line = '';
              break;
            case RegExp:
            case Boolean:
            case String:
            default:
              line += util.inspect(statements[i], utilInspectConfig);
          }
        } catch (err) {
          console.log('[FATAL] Logger cannot process the line');
        }
      }
    }
  }
}

module.exports = {
  Logger,
  logLevels,
  logLevelsOrdering,
};
