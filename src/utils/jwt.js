"use strict";

const jwt = require("jsonwebtoken");
const ENV = require("../configs/env");

class Jwt {
    static generateAccessToken(payload) {
        return jwt.sign(payload, ENV.JWT.ACCESS_SECRET, {
            expiresIn: ENV.JWT.ACCESS_EXPIRES_IN,
        });
    }

    static generateRefreshToken(payload) {
        return jwt.sign(payload, ENV.JWT.REFRESH_SECRET, {
            expiresIn: ENV.JWT.REFRESH_EXPIRES_IN,
        });
    }

    static verifyAccessToken(token) {
        return jwt.verify(token, ENV.JWT.ACCESS_SECRET);
    }

    static verifyRefreshToken(token) {
        return jwt.verify(token, ENV.JWT.REFRESH_SECRET);
    }
}

module.exports = Jwt;
