"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class ValidationError extends AppError {
    constructor(
        errors,
        message = MESSAGES.ERROR.DATABASE.VALIDATION_FAILED.message,
        code = MESSAGES.ERROR.DATABASE.VALIDATION_FAILED.code,
        cause = null
    ) {
        super(message, HTTP_STATUS.UNPROCESSABLE_ENTITY, code, errors, cause);
    }
}

module.exports = ValidationError;
