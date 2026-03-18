"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class AuthenticationError extends AppError {
    constructor(
        message = MESSAGES.ERROR.AUTH.INVALID_CREDENTIALS.message,
        code = MESSAGES.ERROR.AUTH.INVALID_CREDENTIALS.code,
        cause = null
    ) {
        super(message, HTTP_STATUS.UNAUTHORIZED, code, null, cause);
    }
}

module.exports = AuthenticationError;
