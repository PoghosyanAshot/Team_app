"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class UnauthorizedError extends AppError {
    constructor(
        message = MESSAGES.ERROR.GENERAL.UNAUTHORIZED.message,
        code = MESSAGES.ERROR.GENERAL.UNAUTHORIZED.code,
        cause = null
    ) {
        super(message, HTTP_STATUS.UNAUTHORIZED, code, null, cause);
    }
}

module.exports = UnauthorizedError;
