"use strict";

const { deepFreeze } = require("../utils");

const APP_CONFIG = deepFreeze({
    PAGINATION: {
        DEFAULT_PAGE: 1,
        DEFAULT_LIMIT: 50, // 50 messages per fetch
        MAX_LIMIT: 100,
    },
    UPLOADS: {
        MAX_FILE_SIZE: 20 * 1024 * 1024, // 20MB
        ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/gif", "image/webp"],
        ALLOWED_DOC_TYPES: ["application/pdf", "application/msword", "text/plain"],
    },
});

module.exports = APP_CONFIG;
