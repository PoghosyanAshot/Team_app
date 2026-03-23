"use strict";

const { asyncHandler, successResponse } = require("../utils");
const { UserService } = require("../services");
const { HTTP_STATUS, MESSAGES } = require("../constants");
const { BadRequestError } = require("../errors");

const getMe = asyncHandler(async (req, res) => {
    const user = await UserService.findById(req.user.id);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        user,
    );
});

const updateMe = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.updateById(req.user.id, req.body);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedUser,
    );
});

const updateMyPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const updatedUser = await UserService.updatePassword(
        req.user.id,
        oldPassword,
        newPassword,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedUser,
    );
});

const getUserByUsername = asyncHandler(async (req, res) => {
    const user = await UserService.findByUsername(req.params.username);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        user,
    );
});

const searchUsers = asyncHandler(async (req, res) => {
    const users = await UserService.searchUsers(req.query.keyword);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        users,
    );
});

const updateAvatar = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new BadRequestError();
    }

    const updatedUser = await UserService.updateAvatar(
        req.user.id,
        req.file.path,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedUser,
    );
});

const deleteAvatar = asyncHandler(async (req, res) => {
    const updatedUser = await UserService.deleteAvatar(req.user.id);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedUser,
    );
});

const deleteMe = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await UserService.softDeleteById(userId);

    return res.status(HTTP_STATUS.NO_CONTENT).end();
});

const blockUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const targetUserId = req.params.id;

    const updatedUser = await UserService.blockUser(userId, targetUserId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedUser,
    );
});

const unblockUser = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const targetUserId = req.params.id;

    const updatedUser = await UserService.unblockUser(userId, targetUserId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedUser,
    );
});

module.exports = {
    getMe,
    updateMe,
    updateMyPassword,
    getUserByUsername,
    searchUsers,
    updateAvatar,
    deleteAvatar,
    deleteMe,
    blockUser,
    unblockUser,
};
