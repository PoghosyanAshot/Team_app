"use strict";

const successResponse = (res, statusCode, code, message, data = null) => {
    return res.status(statusCode).json({
        success: true,
        code,
        message,
        data,
    });
};

const errorResponse = (res, statusCode, code, message, errors = null) => {
    const response = {
        success: false,
        code,
        message,
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

module.exports = {
    successResponse,
    errorResponse,
};
