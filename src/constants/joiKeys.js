"use strict";

const deepFreeze = require("../utils/deepFreeze");

const JOI_KEYS = deepFreeze({
    REQUIRED: "any.required",
    EMPTY: "string.empty",
    MIN: "string.min",
    MAX: "string.max",
    PATTERN: "string.pattern.base",
    INVALID: "any.invalid",
    MISSING: "object.missing",
});

module.exports = JOI_KEYS;
