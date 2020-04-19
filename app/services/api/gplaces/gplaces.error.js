const errorPrefix = "[GPlaces Service Error] ";

// eslint-disable-next-line func-style
function GPlacesApiError(message, httpCode) {
  const error = new Error(errorPrefix + message);
  error.httpCode = httpCode;
  return error;
}

// eslint-disable-next-line func-style
function GPlacesInvalidParametersError(message, params) {
  const error = new Error(errorPrefix + message);
  error.params = params;
  return error;
}

module.exports = { GPlacesApiError, GPlacesInvalidParametersError };
