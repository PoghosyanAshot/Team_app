"use strict";

require("dotenv").config({ quiet: true });

const assert = require("../utils/assert");
const deepFreeze = require("../utils/deepFreeze");

const ENV = deepFreeze({
    SERVER: {
        PORT: Number(assert(process.env.PORT)),
        HOST: assert(process.env.HOST),
        NODE_ENV: assert(process.env.NODE_ENV),
    },
    DB: {
        MONGO_URI: assert(process.env.MONGO_URI),
        REDIS_URL: assert(process.env.REDIS_URL),
    },
    JWT: {
        ACCESS_SECRET: assert(process.env.JWT_ACCESS_SECRET),
        REFRESH_SECRET: assert(process.env.JWT_REFRESH_SECRET),
        ACCESS_EXPIRES_IN: assert(process.env.JWT_ACCESS_EXPIRES_IN),
        REFRESH_EXPIRES_IN: assert(process.env.JWT_REFRESH_EXPIRES_IN),
    },
    REDIS: {
        EX: Number(assert(process.env.REDIS_EX)),
    },
    CLOUD: {
        NAME: assert(process.env.CLOUD_NAME),
        API_KEY: assert(process.env.CLOUD_API_KEY),
        API_SECRET: assert(process.env.CLOUD_API_SECRET),
    },
});

module.exports = ENV;
