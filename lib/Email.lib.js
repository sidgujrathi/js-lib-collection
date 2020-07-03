const htmlToText = require('html-to-text');
const juice = require('juice');
const mailer = require('nodemailer');
const pug = require('pug');

/** This is helper/lib class to send email notifications */

class EmailNotification {
  /**
   * Sends email with given optoins as template or
   * simple text email
   * @param {MailOptions} options - Email optoins
   * @returns {Promise<MailResponse>} - Promise with Mail response
   */
  async sendEmail(options) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, rejects) => {
      // create env object
      const { env } = process;
      // get mail config based on current env
      const { mailConfig } = env;
      // get mail server based on mail configuration
      const server = await this.getEmailServer(mailConfig);
      // make default email options
      const mailOptions = {
        from: mailConfig.mailOption.fromEmail,
        to: options.to,
        subject: options.subject,
      };

      // if template name is exist then choose pug template from views
      if (options.templateName) {
        mailOptions.html = await this.getTemplate(options.templateName, options.replace);
        mailOptions.text = htmlToText.fromString(mailOptions.html);
      }

      // if text body then assign as text
      if (options.body) {
        mailOptions.text = options.body;
      }

      // if html body then assign as html
      if (options.htmlBody) {
        mailOptions.html = options.htmlBody;
      }

      server.sendMail(mailOptions, (err, info) => {
        console.info(JSON.stringify(err));
        if (info) {
          console.info(JSON.stringify(info));
          resolve({
            success: true,
            item: info,
          });
        } else {
          rejects(new Error({
            success: false,
            error: err,
          }));
        }
      });
    });
  }

  /**
   * Gets tempalte from project template folder
   * @param {String} templateName
   * @param {Object} options - Object containing keys and values to e used with pug template
   * @returns {Promise<string>}
   */
  async getTemplate(templateName, options = {}) {
    const html = pug.renderFile(`${__dirname}/../../views/email-templates/${templateName}.pug`, options);

    return juice(html);
  }

  /**
   * Gets email server instance with provided options
   * @param {MailConfig} mailConfig
   * @returns {Promise} Mail
   */
  async getEmailServer(mailConfig) {
    return mailer.createTransport({
      host: mailConfig.hostConfig.host,
      port: mailConfig.hostConfig.port,
      secure: mailConfig.hostConfig.secure,
      auth: {
        user: mailConfig.hostConfig.auth.username,
        pass: mailConfig.hostConfig.auth.password,
      },
    });
  }
}

module.exports = {
  EmailNotification,
};

/**
 * Send email optoins
 * @typedef {Object} MailOptions
 * @property {String} options.subject - Email subject
 * @property {String} optoins.templateName - Pug template name you have in project
 * @property {String} options.body - Email body
 * @property {String} options.htmlBody - HTMl email body
 * @property {Object} optoins.replace - Object containing keys and values to e used with pug template
 * @property {String} options.to - Recipient email address seperated with commas
 */

/**
 * Send mail response
 * @typedef {Object} MailResponse
 * @property {Boolean} success
 * @property {String} message - Whatever message you want to send back
 * @property {Object} item - Response got from nodemailer
 * @property {Object} error - Error from nodemailer
 */

/**
 * Get Email configuration request options
 * @typedef {Object} MailConfig
 * @property {Object} mailOption
 * @property {String} mailOption.fromEmail - From email address concat with commas
 * @property {String} mailOption.toEmail - To email address concat with commas
 */
