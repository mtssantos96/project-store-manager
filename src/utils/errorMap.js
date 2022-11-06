const errorMap = {
  MISSING_FIELD: 400,
  NOT_FOUND: 404,
  INVALID_VALUE: 422,
};

function mapError(type) {
 return errorMap[type] || 500;
}

module.exports = {
  errorMap,
  mapError,
};