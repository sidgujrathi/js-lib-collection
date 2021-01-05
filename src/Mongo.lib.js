/**
 * MongoDB Library: Collection methods related to mongodb connection
 * We will be take help of JS Closure to maintaing client and db state in variable
 * @module 'Mongo.lib'
 */

const { MongoClient } = require('mongodb'); // Considering will be using latest 3.6.3+

const {
  MONGO_DB_NAME,
  MONGO_SERVER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_USERNAME,
} = process.env;

/**
 * @ignore
 * Returns mongodb connection string
 * @returns {String}
 */
const getConnectionString = () => `mongodb://${MONGO_USERNAME}:${encodeURIComponent(MONGO_PASSWORD)}@${MONGO_SERVER}:${MONGO_PORT}/${MONGO_DB_NAME}?ssl=true&replicaSet=globaldb&retrywrites=false`;

/**
 * Returns closure function which returns connection client and db
 * @returns {Function}
 */
function getMongoInstances() {
  let db = null;
  let client = null;

  const defaultOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 20000,
  };

  /**
   * Establishes connection and return client and db
   * @returns {Promise<MongoInstances>}
   */
  function closureFunction() {
    try {
      if (db && client) {
        return {
          db,
          client,
        };
      }

      // Connect the client to the server
      return MongoClient.connect(getConnectionString(), defaultOptions)
        .then((mongoClient) => {
          console.log('Connected successfully to Mongo Server!');

          client = mongoClient;
          db = mongoClient.db(MONGO_DB_NAME);

          return {
            db,
            client,
          };
        })
        .catch((err) => {
          console.log('Error connecting to Mongo server: ', err.message);
          console.log('Unable to connect to Mongo Server!');
        });
    } finally {
      // on any signal interruption (ctrl-c) close the connection
      process.on('SIGINT', () => {
        client.close();
        process.exit();
      });
    }
  };

  return closureFunction;
}

module.exports = {
  getMongoInstances: getMongoInstances(),
};

/**
 * @typedef {Object} MongoInstances
 * @property {Object} db
 * @property {Object} client
 */
