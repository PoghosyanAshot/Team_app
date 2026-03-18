"use strict";

const { AuthRepository } = require("../repositories");
const { ConflictError, AuthenticationError, UnauthorizedError } = require("../errors");
const { MESSAGES } = require("../constants");
const ENV = require("../configs/env");
const { Jwt } = require("../utils");
const { redisClient } = require("../configs/redis");

class AuthService {
    static async register(userData) {
        const [existsByEmail, existsByUsername] = await Promise.all([
            AuthRepository.existsByEmail(userData.email),
            AuthRepository.existsByUsername(userData.username),
        ]);

        if (existsByEmail) {
            throw new ConflictError(
                MESSAGES.ERROR.USER.EMAIL_EXISTS.message,
                MESSAGES.ERROR.USER.EMAIL_EXISTS.code
            );
        }

        if (existsByUsername) {
            throw new ConflictError(
                MESSAGES.ERROR.USER.USERNAME_EXISTS.message,
                MESSAGES.ERROR.USER.USERNAME_EXISTS.code
            );
        }

        const user = await AuthRepository.createUser(userData);
        return user;
    }

    static async login(userData) {
        const { email, password } = userData;

        const user = await AuthRepository.findByEmail(email, true);

        if (!user) {
            throw new AuthenticationError();
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            throw new AuthenticationError();
        }

        const accessToken = Jwt.generateAccessToken({ id: user._id, role: user.role });
        const refreshToken = Jwt.generateRefreshToken({ id: user._id, role: user.role });

        await redisClient.set(`refreshToken:${user._id}`, refreshToken, {
            EX: ENV.REDIS.EX,
        });

        return { accessToken, refreshToken };
    }

    static async logout(id) {
        await redisClient.del(`refreshToken:${id}`);
    }

    static async refreshToken(token) {
        if (!token) {
            throw new UnauthorizedError();
        }

        const payload = Jwt.verifyRefreshToken(token);
        const oldRefreshToken = await redisClient.get(`refreshToken:${payload.id}`);

        if (token !== oldRefreshToken) {
            await redisClient.del(`refreshToken:${payload.id}`);
            throw new UnauthorizedError();
        }

        const accessToken = Jwt.generateAccessToken({ id: payload.id, role: payload.role });
        const refreshToken = Jwt.generateRefreshToken({ id: payload.id, role: payload.role });

        await redisClient.set(`refreshToken:${payload.id}`, refreshToken, {
            EX: ENV.REDIS.EX,
        });

        return { accessToken, refreshToken };
    }
}

module.exports = AuthService;
