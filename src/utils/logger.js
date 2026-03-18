"use strict";

const winston = require("winston");
const ENV = require("../configs/env");

// custom log format
const logFormat = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.errors({ stack: true }), // Բռնում է ուղիղ նետված սխալները
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        const metaStack = meta && meta.error && meta.error.stack ? meta.error.stack : null;
        const actualStack = stack || metaStack;

        let formattedMeta = "";
        if (Object.keys(meta).length) {
            if (meta.error && meta.error.stack) delete meta.error.stack;
            formattedMeta = `\n${JSON.stringify(meta, null, 2)}`;
        }

        let logMessage = `[${timestamp}] ${level.toUpperCase()}: ${message} ${formattedMeta}`;

        if (actualStack) {
            logMessage += `\n\n---  STACK TRACE ---\n${actualStack}\n-----------------------\n`;
        }

        return logMessage;
    })
);

// transports
const transports = [
    new winston.transports.File({
        filename: "logs/error.log",
        level: "error",
    }),
    new winston.transports.File({
        filename: "logs/combined.log",
    }),
];

if (ENV.SERVER.NODE_ENV === "development") {
    transports.push(
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), logFormat),
        })
    );
}

const logger = winston.createLogger({
    level: "info",
    format: logFormat,
    transports: transports,
    exitOnError: false,
});

module.exports = logger;
