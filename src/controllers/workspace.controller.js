"use strict";

const { asyncHandler, successResponse } = require("../utils");
const { WorkspaceService } = require("../services");
const { HTTP_STATUS, MESSAGES } = require("../constants");

const createWorkspace = asyncHandler(async (req, res) => {
    const ownerId = req.user.id;

    const { name, slug, avatarUrl } = req.body;

    const workspace = await WorkspaceService.createWorkspace(ownerId, {
        name,
        slug,
        avatarUrl,
    });

    return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        workspace,
    );
});

const getWorkspaceById = asyncHandler(async (req, res) => {
    const workspace = await WorkspaceService.getWorkspaceById(req.params.id);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        workspace,
    );
});

const getWorkspaceBySlug = asyncHandler(async (req, res) => {
    const workspace = await WorkspaceService.getWorkspaceBySlug(
        req.params.slug,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        workspace,
    );
});

const getUserWorkspaces = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const workspaces = await WorkspaceService.getUserWorkspaces(userId);

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        workspaces,
    );
});

const updateWorkspace = asyncHandler(async (req, res) => {
    const workspaceId = req.params.workspaceId;

    const { name, slug, avatarUrl } = req.body;

    const updatedWorkspace = await WorkspaceService.updateWorkspace(
        workspaceId,
        {
            ...(name && { name }),
            ...(slug && { slug }),
            ...(avatarUrl !== undefined && { avatarUrl }),
        },
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedWorkspace,
    );
});

const addMember = asyncHandler(async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const { userId, role } = req.body;

    const updatedWorkspace = await WorkspaceService.addMember(
        workspaceId,
        userId,
        role,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedWorkspace,
    );
});

const removeMember = asyncHandler(async (req, res) => {
    const workspaceId = req.params.workspaceId;
    const targetUserId = req.params.userId;

    const updatedWorkspace = await WorkspaceService.removeMember(
        workspaceId,
        targetUserId,
    );

    return successResponse(
        res,
        HTTP_STATUS.OK,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        updatedWorkspace,
    );
});

module.exports = {
    createWorkspace,
    getWorkspaceById,
    getWorkspaceBySlug,
    getUserWorkspaces,
    updateWorkspace,
    addMember,
    removeMember,
};
