"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class ConflictError extends AppError {
    constructor(
        message = MESSAGES.ERROR.USER.EMAIL_EXISTS.message,
        code = MESSAGES.ERROR.USER.EMAIL_EXISTS.code,
        cause = null
    ) {
        super(message, HTTP_STATUS.CONFLICT, code, null, cause);
    }
}

module.exports = ConflictError;
