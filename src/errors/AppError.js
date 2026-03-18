"use strict";

class AppError extends Error {
    constructor(message, statusCode, code, errors = null, cause = null) {
        super(message);

        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;
        this.cause = cause;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = AppError;
