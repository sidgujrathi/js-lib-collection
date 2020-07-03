const AWS = require('aws-sdk');
const S3 = require('aws-sdk/clients/s3');
const multer = require('multer');
const multerS3 = require('multer-s3');

/** This is wrapper class to s3 API functions with
 * promisification & custom response handling
 * */
class S3Wrapper {
  constructor() {
    this.env = process.env;
    // This should be avoided at any cost
    // If you are using lambda or ec2 then alwasy attach AWS role
    const config = new AWS.Config(this.env.awsConfiguration);
    AWS.config = config;
    this.s3 = new S3();
  }

  /**
   * ListBuckets function promisified
   * @returns {Promise<S3HelperResponse>}
   */
  async getBuckets() {
    return this.s3.listBuckets().promise()
      .then(this.generateS3SuccessResponse)
      .catch(this.generateS3ErrorResponse);
  }

  /**
   * Creates bucket in s3
   * @param {String} bucketName - Uniq bucket name
   * @param {String} ACL -Optional - AWS bucket ACL optoins
   * @returns {Promise<S3HelperResponse>}
   */
  async addBucket(bucketName, ACL = 'public-read') {
    if (bucketName) {
      const bucketParams = {
        Bucket: bucketName,
        ACL,
      };

      return this.s3.createBucket(bucketParams).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }
    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'BUCKET_NAME_IS_NOT_DEFINE',
    }));
  }

  /**
   * Deletes provided bucket from S3
   * @param { String } bucketName
   * @returns { Promise<S3HelperResponse> }
   */
  async deleteBucket(bucketName) {
    if (bucketName) {
      const bucketParams = {
        Bucket: bucketName,
      };

      return this.s3.deleteBucket(bucketParams).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }

    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'BUCKET_NAME_IS_NOT_DEFINE',
    }));
  }

  /**
   * Uploads multiplart files to s3 using multer package
   * @param {Object} req - Can be express js request
   * @param {Object} res - Express response
   * @param {String} fieldName
   * @param {String} permission
   * @param {String} bucketName
   * @returns {Promise<S3HelperResponse>}
   */
  async uploadMulterS3(req, res, fieldName = 'image', permission = 'public-read', bucketName) {
    return new Promise((resolve, rejects) => {
      if (bucketName) {
        const upload = multer({
          storage: multerS3({
            s3: this.s3,
            bucket: bucketName,
            acl: permission,
            key(request, file, cb) {
              const originalname = file.originalname.replace(/[&/\\#,+()$~%'":*?<>{}@\s]/g, '_');
              cb(null, `${Date.now()}-${originalname}`);
            },
          }),
        }).single(fieldName);

        upload(req, res, (err) => {
          if (err) {
            const httpStatusCode = err.statusCode;
            const errorMessage = err.message;
            rejects(new Error({
              success: false,
              httpStatusCode,
              error: err,
              message: errorMessage,
            }));
          } else {
            resolve({
              success: true,
              item: req.file,
              body: req.body,
              postType: req.query.postType,
            });
          }
        });
      } else {
        rejects(new Error({
          success: false,
          httpStatusCode: 401,
          message: 'BUCKET_NAME_IS_NOT_DEFINE',
        }));
      }
    });
  }

  /**
   * Uploads fils/object to s3
   * @param {File | String} fileContent - This can be file, JSON string
   * @param {String} fileName
   * @param {String} permission
   * @param {String} bucketName
   * @param {String} contentType - s3 supported file content type
   * @returns {Promise<S3HelperResponse>}
   */
  async uploadObject(fileContent, fileName, permission = 'public-read', bucketName, contentType) {
    if (fileName && fileContent) {
      const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: fileContent,
        ContentEncoding: contentType,
        ACL: permission,
      };

      return this.s3.upload(params).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }

    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'FILE_PATH_IS_NOT_DEFINED',
    }));
  }

  /**
   * Gets s3 objects based on prefix if provided
   * @param {String} bucketName
   * @param {String} prefix
   * @returns {Promise<S3HelperResponse>}
   */
  async getObjects(bucketName, prefix) {
    if (bucketName) {
      const params = {
        Bucket: bucketName,
        Delimiter: '',
        ...(prefix && ({ Prefix: prefix })),
      };

      return this.s3.listObjects(params).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }
    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'BUCKET_NAME_IS_NOT_DEFINE',
    }));
  }

  /**
   * Get single object by key name
   * @param {String} bucketName
   * @param {String} objPath
   * @returns {Promise<S3HelperResponse>}
   */
  async getObject(bucketName, objPath) {
    if (bucketName) {
      const params = {
        Bucket: bucketName,
        Key: objPath,
      };

      return this.s3.getObject(params).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }

    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'BUCKET_NAME_IS_NOT_DEFINE',
    }));
  }

  /**
   * Delete single object by key name
   * @param {String} bucketName
   * @param {String} objPath
   * @returns {Promise<S3HelperResponse>}
   */
  async deleteObject(bucketName, objPath) {
    if (bucketName) {
      const params = {
        Bucket: bucketName,
        Key: objPath,
      };

      return this.s3.deleteObject(params).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }

    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'BUCKET_NAME_IS_NOT_DEFINE',
    }));
  }

  /**
   * Deletes multiple objects from s3
   * @param {String} bucketName
   * @param {Object} objects
   * @param {String} objects.Key
   * @returns {Promise<S3HelperResponse>}
   */
  async deleteObjects(bucketName, objects) {
    if (objects && objects.length) {
      const params = {
        Bucket: bucketName,
        Delete: {
          Objects: objects,
        },
      };

      return this.s3.deleteObjects(params).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }
    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'OBJECT_IS_NOT_DEFINED,',
    }));
  }

  /**
   * Gets Meta data for s3 object
   * @param {String} bucketName
   * @param {String} key
   * @returns {Promise<S3HelperResponse>}
   */
  async getObjectMetadata(bucketName, key) {
    if (bucketName) {
      const params = {
        Bucket: bucketName,
        Key: key,
      };

      return this.s3.headObject(params).promise()
        .then(this.generateS3SuccessResponse)
        .catch(this.generateS3ErrorResponse);
    }
    return Promise.reject(new Error({
      success: false,
      httpStatusCode: 401,
      message: 'BUCKET_NAME_IS_NOT_DEFINE',
    }));
  }

  /** @ignore */
  generateS3SuccessResponse(data) {
    return {
      success: true,
      data,
    };
  }

  /** @ignore */
  generateS3ErrorResponse(err) {
    return {
      success: false,
      httpStatusCode: err.statusCode,
      error: err,
      message: err.message,
    };
  }
}

module.exports = S3Wrapper;

/**
 * S3 Wrapper Response
 * @typedef {Object} S3HelperResponse
 * @property {Boolean} success
 * @property {Object} data - Optional
 * @property {Number} httpStatusCode
 * @property {Object} error
 * @property {String} message
 */
