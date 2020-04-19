const errorPrefix = "[VVS Service Error] ";

// eslint-disable-next-line func-style
function VvsMultiplePointsError(message, points) {
  const error = new Error(errorPrefix + message);
  error.points = points;
  return error;
}

// eslint-disable-next-line func-style
function VvsUnresolvableKeywordError(message, keyword) {
  const error = new Error(errorPrefix + message);
  error.keyword = keyword;
  return error;
}

// eslint-disable-next-line func-style
function VvsInvalidParametersError(message, params) {
  const error = new Error(errorPrefix + message);
  error.params = params;
  return error;
}

module.exports = { VvsInvalidParametersError, VvsMultiplePointsError, VvsUnresolvableKeywordError };
