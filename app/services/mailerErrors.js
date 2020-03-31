const errorPrefix = "[Mailer Service Error] ";

function MailerApiError(message, errorObject) {
  const error = new Error(errorPrefix + message);
  error.object = errorObject;
  return error;
}


module.exports = {MailerApiError};
