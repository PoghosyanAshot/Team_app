"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class ForbiddenError extends AppError {
    constructor(
        message = MESSAGES.ERROR.GENERAL.FORBIDDEN.message,
        code = MESSAGES.ERROR.GENERAL.FORBIDDEN.code,
        cause = null
    ) {
        super(message, HTTP_STATUS.FORBIDDEN, code, null, cause);
    }
}

module.exports = ForbiddenError;
