"use strict";

const { asyncHandler, successResponse } = require("../utils");
const { HTTP_STATUS, MESSAGES } = require("../constants");
const { ChannelService } = require("../services");

const createChannel = asyncHandler(async (req, res) => {
    const channelData = req.body;
    const creatorId = req.user.id;
    const workspaceId = req.params.workspaceId;

    const channel = await ChannelService.createChannel(
        workspaceId,
        creatorId,
        channelData,
    );

    return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.SUCCESS.CHANNEL.CREATED.code,
        MESSAGES.SUCCESS.CHANNEL.CREATED.message,
        channel,
    );
});

const getChannelById = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const channelId = req.params.channelId;

    const channel = await ChannelService.getChannelById(channelId, userId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        channel,
    );
});

const getWorkspaceChannels = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const workspaceId = req.params.workspaceId;

    const channels = await ChannelService.getWorkspaceChannels(
        workspaceId,
        userId,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        channels,
    );
});

const updateChannel = asyncHandler(async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const channelId = req.params.channelId;
    const channelData = req.body;

    const updatedChannel = await ChannelService.updateChannel(
        channelId,
        workspaceId,
        channelData,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedChannel,
    );
});

const addMember = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const { memberId } = req.body;

    const updatedChannel = await ChannelService.addMember(channelId, memberId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedChannel,
    );
});

const removeMember = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const memberId = req.params.memberId;

    const updatedChannel = await ChannelService.removeMember(
        channelId,
        memberId,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedChannel,
    );
});

const leaveChannel = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const memberId = req.user.id;

    const updatedChannel = await ChannelService.leaveChannel(
        channelId,
        memberId,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedChannel,
    );
});

const deleteChannel = asyncHandler(async (req, res) => {
    const channelId = req.params.channelId;
    const ownerId = req.user.id;

    const archivedChannel = await ChannelService.deleteChannel(
        channelId,
        ownerId,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        archivedChannel,
    );
});

module.exports = {
    createChannel,
    getChannelById,
    getWorkspaceChannels,
    updateChannel,
    addMember,
    removeMember,
    leaveChannel,
    deleteChannel,
};
