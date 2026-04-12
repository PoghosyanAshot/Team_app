"use strict";

const { WorkspaceRepository } = require("../repositories");
const { NotFoundError, BadRequestError, ConflictError } = require("../errors");
const { MESSAGES, ROLES } = require("../constants");

class WorkspaceService {
    static async createWorkspace(ownerId, data) {
        const existingWorkspace = await WorkspaceRepository.findBySlug(
            data.slug,
        );

        if (existingWorkspace) {
            throw new ConflictError(
                MESSAGES.ERROR.WORKSPACE.ALREADY_EXISTS.message,
                MESSAGES.ERROR.WORKSPACE.ALREADY_EXISTS.code,
            );
        }

        const workspaceData = {
            ...data,
            owner: ownerId,
            members: [
                {
                    user: ownerId,
                    role: ROLES.ADMIN,
                },
            ],
        };

        return await WorkspaceRepository.create(workspaceData);
    }

    static async getWorkspaceById(id) {
        const workspace = await WorkspaceRepository.findById(id);

        WorkspaceService.#checkWorkspaceExists(workspace);

        return workspace;
    }

    static async getWorkspaceBySlug(slug) {
        const workspace = await WorkspaceRepository.findBySlug(slug);

        WorkspaceService.#checkWorkspaceExists(workspace);

        return workspace;
    }

    static async getUserWorkspaces(userId) {
        return await WorkspaceRepository.findUserWorkspaces(userId);
    }

    static async updateWorkspace(id, data) {
        const workspace = await WorkspaceRepository.findById(id);
        WorkspaceService.#checkWorkspaceExists(workspace);

        if (data.slug && data.slug !== workspace.slug) {
            const existingSlug = await WorkspaceRepository.findBySlug(
                data.slug,
            );
            if (existingSlug) {
                throw new ConflictError(
                    MESSAGES.ERROR.WORKSPACE.ALREADY_EXISTS.message,
                    MESSAGES.ERROR.WORKSPACE.ALREADY_EXISTS.code,
                );
            }
        }

        return await WorkspaceRepository.updateById(id, data);
    }

    static async addMember(workspaceId, newMemberId, role = ROLES.MEMBER) {
        const workspace = await WorkspaceRepository.findById(workspaceId);
        WorkspaceService.#checkWorkspaceExists(workspace);

        const isAlreadyMember = workspace.members.some(
            (member) => member.user._id.toString() === newMemberId.toString(),
        );

        if (isAlreadyMember) {
            throw new BadRequestError(
                MESSAGES.ERROR.WORKSPACE.ALREADY_MEMBER.message,
                MESSAGES.ERROR.WORKSPACE.ALREADY_MEMBER.code,
            );
        }

        const memberData = {
            user: newMemberId,
            role: role,
        };

        return await WorkspaceRepository.addMember(workspaceId, memberData);
    }

    static async removeMember(workspaceId, targetUserId) {
        const workspace = await WorkspaceRepository.findById(workspaceId);
        WorkspaceService.#checkWorkspaceExists(workspace);

        if (workspace.owner._id.toString() === targetUserId.toString()) {
            throw new ForbiddenError();
        }

        const isMember = workspace.members.some(
            (member) => member.user._id.toString() === targetUserId.toString(),
        );

        if (!isMember) {
            throw new BadRequestError();
        }

        return await WorkspaceRepository.removeMember(
            workspaceId,
            targetUserId,
        );
    }

    // helpers
    static #checkWorkspaceExists(workspace) {
        if (!workspace) {
            throw new NotFoundError(
                MESSAGES.ERROR.WORKSPACE.NOT_FOUND.message,
                MESSAGES.ERROR.WORKSPACE.NOT_FOUND.code,
            );
        }
    }
}

module.exports = WorkspaceService;
