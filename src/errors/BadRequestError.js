"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class BadRequestError extends AppError {
    constructor(
        message = MESSAGES.ERROR.GENERAL.BAD_REQUEST.message,
        code = MESSAGES.ERROR.GENERAL.BAD_REQUEST.code,
        errors = null,
        cause = null
    ) {
        super(message, HTTP_STATUS.BAD_REQUEST, code, errors, cause);
    }
}

module.exports = BadRequestError;
