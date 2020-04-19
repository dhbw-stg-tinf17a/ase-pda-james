const errorPrefix = "[VVS Service Error] ";

function VvsMultiplePointsError(message, points) {
  const error = new Error(errorPrefix + message);
  error.points = points;
  return error;
}

function VvsUnresolvableKeywordError(message, keyword) {
  const error = new Error(errorPrefix + message);
  error.keyword = keyword;
  return error;
}

function VvsInvalidParametersError(message, params) {
  const error = new Error(errorPrefix + message);
  error.params = params;
  return error;
}

module.exports = { VvsInvalidParametersError, VvsMultiplePointsError, VvsUnresolvableKeywordError };
