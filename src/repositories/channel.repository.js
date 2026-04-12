"use strict";

const { Channel } = require("../models");

class ChannelRepository {
    static create(channelData) {
        const channel = new Channel(channelData);
        return channel.save();
    }

    static findById(id) {
        return Channel.findById(id)
            .populate("createdBy", "username avatarUrl")
            .populate("members", "username avatarUrl firstName lastName")
            .populate("workspace", "name slug")
            .exec();
    }

    static findByWorkspace(workspaceId) {
        return Channel.find({ workspace: workspaceId })
            .populate("createdBy", "username")
            .exec();
    }

    static checkNameExists(name, workspaceId) {
        return Channel.exists({ name, workspace: workspaceId }).exec();
    }

    static findUserChannels(workspaceId, userId) {
        return Channel.find({
            workspace: workspaceId,
            $or: [{ isPrivate: false }, { members: userId }],
        }).exec();
    }

    static updateById(id, data) {
        return Channel.findByIdAndUpdate(id, data, {
            returnDocument: "after",
            runValidators: true,
        }).exec();
    }

    static addMember(channelId, userId) {
        return Channel.findByIdAndUpdate(
            channelId,
            { $addToSet: { members: userId } },
            { returnDocument: "after" },
        ).exec();
    }

    static removeMember(channelId, userId) {
        return Channel.findByIdAndUpdate(
            channelId,
            { $pull: { members: userId } },
            { returnDocument: "after" },
        ).exec();
    }

    static softDeleteById(id) {
        return Channel.findByIdAndUpdate(
            id,
            { isArchived: true },
            { returnDocument: true },
        ).exec();
    }

    static deleteById(id) {
        return Channel.findByIdAndDelete(id).exec();
    }
}

module.exports = ChannelRepository;
