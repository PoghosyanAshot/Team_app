"use strict";

const VALIDATION_LIMITS = {
    USER: {
        NAME_MAX: 50,
        USERNAME_MIN: 3,
        USERNAME_MAX: 30,
        PASSWORD_MIN: 8,
        CUSTOM_STATUS_MAX: 100,
    },
    WORKSPACE: {
        NAME_MAX: 50,
    },
    CHANNEL: {
        NAME_MAX: 80,
        DESCRIPTION_MAX: 250,
    },
};

module.exports = VALIDATION_LIMITS;
