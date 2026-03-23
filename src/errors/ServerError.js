"use strict";

const AppError = require("./AppError");
const { HTTP_STATUS, MESSAGES } = require("../constants");

class ServerError extends AppError {
    constructor() {
        super(
            MESSAGES.ERROR.GENERAL.SERVER_ERROR.message,
            HTTP_STATUS.INTERNAL_SERVER_ERROR,
            MESSAGES.ERROR.GENERAL.SERVER_ERROR.code,
        );
    }
}

module.exports = ServerError;
