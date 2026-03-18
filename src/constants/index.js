"use strict";

const HTTP_STATUS = require("./httpStatuses");
const { ROLES, USER_STATUS } = require("./roles");
const REGEX_PATTERNS = require("./regex");
const { SOCKET_EVENTS, ROOM_PREFIXES } = require("./socketEvents");
const APP_CONFIG = require("./appConfig");
const MESSAGES = require("./responseMessages");
const VALIDATION_LIMITS = require("./validationLimits");
const JOI_KEYS = require("./joiKeys");

module.exports = {
    HTTP_STATUS,
    ROLES,
    USER_STATUS,
    REGEX_PATTERNS,
    SOCKET_EVENTS,
    ROOM_PREFIXES,
    APP_CONFIG,
    MESSAGES,
    VALIDATION_LIMITS,
    JOI_KEYS,
};
