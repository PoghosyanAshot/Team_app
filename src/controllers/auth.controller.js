"use strict";

const { AuthService } = require("../services");
const { successResponse, asyncHandler } = require("../utils");
const { HTTP_STATUS, MESSAGES } = require("../constants");
const ENV = require("../configs/env");

const register = asyncHandler(async (req, res) => {
    const user = await AuthService.register(req.body);

    return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.SUCCESS.AUTH.REGISTER.code,
        MESSAGES.SUCCESS.AUTH.REGISTER.message,
        user
    );
});

const login = asyncHandler(async (req, res) => {
    const { accessToken, refreshToken } = await AuthService.login(req.body);
    const data = { accessToken };

    res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: ENV.REDIS.EX * 1000,
        secure: ENV.NODE_ENV === "production",
    });

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.AUTH.LOGIN.code,
        MESSAGES.SUCCESS.AUTH.LOGIN.message,
        data
    );
});

const logout = asyncHandler(async (req, res) => {
    const id = req.user.id;

    await AuthService.logout(id);
    res.clearCookie("refresh-token");

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.AUTH.LOGOUT.code,
        MESSAGES.SUCCESS.AUTH.LOGOUT.message
    );
});

const refreshToken = asyncHandler(async (req, res) => {
    const token = req.cookies["refresh-token"];

    const { accessToken, refreshToken } = await AuthService.refreshToken(token);

    res.cookie("refresh-token", refreshToken, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: ENV.REDIS.EX * 1000,
        secure: ENV.NODE_ENV === "production",
    });

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.AUTH.LOGIN.code,
        MESSAGES.SUCCESS.AUTH.LOGIN.message,
        accessToken
    );
});

module.exports = {
    register,
    login,
    logout,
    refreshToken,
};
