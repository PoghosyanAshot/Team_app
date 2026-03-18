"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class NotFoundError extends AppError {
    constructor(
        message = MESSAGES.ERROR.GENERAL.NOT_FOUND.message,
        code = MESSAGES.ERROR.GENERAL.NOT_FOUND.code,
        cause = null
    ) {
        super(message, HTTP_STATUS.NOT_FOUND, code, null, cause);
    }
}

module.exports = NotFoundError;
