const errorPrefix = "[GPlaces Service Error] ";

function GPlacesApiError(message, httpCode) {
  const error = new Error(errorPrefix + message);
  error.httpCode = httpCode;
  return error;
}

function GPlacesInvalidParametersError(message, params) {
  const error = new Error(errorPrefix + message);
  error.params = params;
  return error;
}


module.exports = {GPlacesApiError, GPlacesInvalidParametersError};
