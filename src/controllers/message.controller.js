"use strict";

const { asyncHandler, successResponse } = require("../utils");
const { MessageService } = require("../services");
const { HTTP_STATUS, MESSAGES } = require("../constants");

const createMessage = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const messageData = req.body;

    const message = await MessageService.createMessage(userId, messageData);

    return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.SUCCESS.MESSAGE.SENT.code,
        MESSAGES.SUCCESS.MESSAGE.SENT.message,
        message,
    );
});

const getMessageById = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;

    const message = await MessageService.findById(messageId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        message,
    );
});

const getChannelMessages = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const limit = parseInt(req.query.limit, 10) || 50;
    const skip = parseInt(req.query.skip, 10) || 0;

    const messages = await MessageService.getChannelMessages(
        channelId,
        limit,
        skip,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        messages,
    );
});

const getThreadMessages = asyncHandler(async (req, res) => {
    const parentMessageId = req.params.parentMessageId;

    const threadMessages =
        await MessageService.getThreadMessages(parentMessageId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        threadMessages,
    );
});

const updateMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    const userId = req.user.id;
    const updateData = req.body;

    const updatedMessage = await MessageService.updateById(
        messageId,
        userId,
        updateData,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedMessage,
    );
});

const toggleReaction = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    const userId = req.user.id;
    const emoji = req.body.emoji;

    const updatedMessage = await MessageService.toggleReaction(
        messageId,
        userId,
        emoji,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedMessage,
    );
});

const deleteMessage = asyncHandler(async (req, res) => {
    const messageId = req.params.messageId;
    const userId = req.user.id;

    await MessageService.softDeleteById(messageId, userId);

    return res.status(HTTP_STATUS.NO_CONTENT).end();
});

module.exports = {
    createMessage,
    getMessageById,
    getChannelMessages,
    getThreadMessages,
    updateMessage,
    toggleReaction,
    deleteMessage,
};
