const errorPrefix = "[Mailer Service Error] ";

// eslint-disable-next-line func-style
function MailerApiError(message, errorObject) {
  const error = new Error(errorPrefix + message);
  error.object = errorObject;
  return error;
}

module.exports = { MailerApiError };
