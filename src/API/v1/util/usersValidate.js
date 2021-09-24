const debug = require("debug")("usersValidate");
function handleFieldsValidation(err) {
  try {
    const errorMsg = { path: "", message: "" };
    if (err.errors) {
      const [ValidationErrorItem] = err.errors;
      errorMsg.path = ValidationErrorItem.path;
      errorMsg.message = ValidationErrorItem.message;
      return errorMsg;
    }

    return errorMsg;
  } catch (error) {
    debug(error);
  }
}

module.exports = {
  handleFieldsValidation,
};
