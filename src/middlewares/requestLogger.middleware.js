"use strict";

const { logger } = require("../utils");

const SENSITIVE_FIELDS = ["password", "oldPassword", "newPassword", "accesstoken", "refreshtoken"];

const deeplySanitizeData = (data) => {
    if (!data || typeof data !== "object") {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map((item) => deeplySanitizeData(item));
    }

    const sanitizedObj = {};

    for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
            if (SENSITIVE_FIELDS.includes(key.toLowerCase())) {
                sanitizedObj[key] = "***[REDACTED]***";
            } else {
                sanitizedObj[key] = deeplySanitizeData(data[key]);
            }
        }
    }

    return sanitizedObj;
};

const requestLogger = (req, res, next) => {
    const { method, originalUrl, ip, query, params, body } = req;

    const hasBody = body && Object.keys(body).length > 0;
    const hasQuery = query && Object.keys(query).length > 0;
    const hasParams = params && Object.keys(params).length > 0;

    const logData = {
        ip,
        ...(hasQuery && { query: deeplySanitizeData(query) }),
        ...(hasParams && { params: deeplySanitizeData(params) }),
        ...(hasBody && { body: deeplySanitizeData(body) }),
    };

    logger.info(`Incoming Request: ${method} ${originalUrl}`, logData);

    next();
};

module.exports = requestLogger;
