/**
 * GCP Storage Library: Colletction of generic gcp
 * storage functions
 * @module 'GCPStorage.lib.js'
 */

const { Storage } = require('@google-cloud/storage');

const { credentials, bucketName } = process.env;

/**
 * Uploads file to GCP storage
 * @param {File} file
 * @returns {Object} GCP Storage upload response
 */
const upload = async (file) => {
  const storage = new Storage({ credentials });
  const arrName = file.name.split('.');
  const ext = arrName.pop();
  const newFileName = `${arrName.join('.')}_${new Date().getTime()}.${ext}`;

  const resp = await storage.bucket(bucketName).upload(file.path, {
    destination: newFileName,
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    // By setting the option `destination`, you can change the name of the
    // object you are uploading to a bucket.
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      // cacheControl: 'public, max-age=31536000'
      cacheControl: 'no-cache',
    },
  });

  return resp[0];
};

module.exports = {
  upload,
};
