"use strict";

const { logger, errorResponse } = require("../utils");
const { HTTP_STATUS, MESSAGES } = require("../constants");
const {
    BadRequestError,
    ConflictError,
    ValidationError,
    AuthenticationError,
} = require("../errors");
const ENV = require("../configs/env");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new BadRequestError(message, MESSAGES.ERROR.DATABASE.CAST_ERROR.code);
};

const handleDuplicateFieldsDB = (err) => {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `Duplicate field value: '${value}'. Please use another value for '${field}'.`;
    return new ConflictError(message, MESSAGES.ERROR.DATABASE.DUPLICATE_KEY.code);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join(". ")}`;
    return new ValidationError(errors, message, MESSAGES.ERROR.DATABASE.VALIDATION_FAILED.code);
};

const handleJWTError = () => {
    return new AuthenticationError(
        MESSAGES.ERROR.AUTH.TOKEN_INVALID.message,
        MESSAGES.ERROR.AUTH.TOKEN_INVALID.code
    );
};

const handleJWTExpiredError = () => {
    return new AuthenticationError(
        MESSAGES.ERROR.AUTH.TOKEN_EXPIRED.message,
        MESSAGES.ERROR.AUTH.TOKEN_EXPIRED.code
    );
};

const sendErrorDev = (err, req, res) => {
    logger.error(`[DEV ERROR] ${req.method} ${req.originalUrl}`, { error: err });

    return errorResponse(
        res,
        err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR,
        err.code || MESSAGES.ERROR.GENERAL.SERVER_ERROR.code,
        err.message || MESSAGES.ERROR.GENERAL.SERVER_ERROR.message,
        err.errors || null,
        err.stack
    );
};

const sendErrorProd = (err, req, res) => {
    if (err.isOperational) {
        return errorResponse(res, err.statusCode, err.code, err.message, err.errors || null);
    }

    logger.error(`[PROD CRITICAL ERROR] ${req.method} ${req.originalUrl}`, {
        message: err.message,
        stack: err.stack,
        ip: req.ip,
    });

    return errorResponse(
        res,
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        MESSAGES.ERROR.GENERAL.SERVER_ERROR.code,
        MESSAGES.ERROR.GENERAL.SERVER_ERROR.message
    );
};

const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    err.code = err.code || MESSAGES.ERROR.GENERAL.SERVER_ERROR.code;

    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    error.isOperational = err.isOperational || false;

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError") error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    if (ENV.SERVER.NODE_ENV === "development") {
        sendErrorDev(error, req, res);
    } else {
        sendErrorProd(error, req, res);
    }
};

module.exports = errorHandler;
