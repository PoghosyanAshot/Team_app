"use strict";

const { ChannelRepository } = require("../repositories");
const { ConflictError, NotFoundError, ForbiddenError } = require("../errors");

class ChannelService {
    static async createChannel(workspaceId, creatorId, channelData) {
        const nameExists = await ChannelRepository.checkNameExists(
            channelData.name,
            workspaceId,
        );

        if (nameExists) {
            throw new ConflictError();
        }

        const newChannelData = {
            ...channelData,
            workspace: workspaceId,
            createdBy: creatorId,
            members: [creatorId],
        };

        const newChannel = await ChannelRepository.create(newChannelData);

        return newChannel;
    }

    static async getChannelById(channelId, userId) {
        const channel = await ChannelRepository.findById(channelId);

        if (!channel || channel.isArchived) {
            throw new NotFoundError();
        }

        if (channel.isPrivate) {
            const isMember = channel.members.some(
                (m) => m._id.toString() === userId.toString(),
            );

            if (!isMember) {
                throw new ForbiddenError("");
            }
        }

        return channel;
    }

    static async getWorkspaceChannels(workspaceId, userId) {
        return await ChannelRepository.findUserChannels(workspaceId, userId);
    }

    static async updateChannel(channelId, workspaceId, channelData) {
        const channel = await ChannelRepository.findById(channelId);

        if (!channel || channel.isArchived) {
            throw new NotFoundError();
        }

        if (channelData.name && channelData.name !== channel.name) {
            const nameExists = await ChannelRepository.checkNameExists(
                channelData.name,
                workspaceId,
            );

            if (nameExists) {
                throw new ConflictError();
            }
        }

        const updatedChannel = await ChannelRepository.updateById(
            channelId,
            channelData,
        );

        if (!updatedChannel) {
            throw new NotFoundError();
        }

        return updatedChannel;
    }

    static async addMember(channelId, memberId) {
        const channel = await ChannelRepository.findById(channelId);

        if (!channel || channel.isArchived) {
            throw new NotFoundError();
        }

        const isAlreadyMember = channel.members.some(
            (m) => m._id.toString() === memberId.toString(),
        );

        if (isAlreadyMember) {
            throw new ConflictError();
        }

        return await ChannelRepository.addMember(channelId, memberId);
    }

    static async removeMember(channelId, memberId) {
        const channel = await ChannelRepository.findById(channelId);

        if (!channel || channel.isArchived) {
            throw new NotFoundError();
        }

        if (channel.createdBy._id.toString() === memberId.toString()) {
            throw new ForbiddenError();
        }

        const existingMember = channel.members.some(
            (m) => m._id.toString() === memberId.toString(),
        );

        if (!existingMember) {
            throw new NotFoundError();
        }

        return await ChannelRepository.removeMember(channelId, memberId);
    }

    static async leaveChannel(channelId, memberId) {
        const channel = await ChannelRepository.findById(channelId);

        if (!channel || channel.isArchived) {
            throw new NotFoundError();
        }

        if (channel.createdBy._id.toString() === memberId.toString()) {
            throw new ForbiddenError();
        }

        const existingMember = channel.members.some(
            (m) => m._id.toString() === memberId.toString(),
        );

        if (!existingMember) {
            throw new NotFoundError();
        }

        return await ChannelRepository.removeMember(channelId, memberId);
    }

    static async deleteChannel(channelId, ownerId) {
        const channel = await ChannelRepository.findById(channelId);

        if (!channel || channel.isArchived) {
            throw new NotFoundError();
        }

        if (channel.createdBy._id.toString() !== ownerId.toString()) {
            throw new ForbiddenError();
        }

        return await ChannelRepository.softDeleteById(channelId);
    }
}

module.exports = ChannelService;
