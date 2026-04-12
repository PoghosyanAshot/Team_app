"use strict";

const { Workspace } = require("../models");

class WorkspaceRepository {
    static create(workspaceData) {
        const workspace = new Workspace(workspaceData);
        return workspace.save();
    }

    static findById(id) {
        return Workspace.findById(id)
            .populate("owner", "username avatarUrl firstName lastName")
            .exec();
    }

    static findBySlug(slug) {
        return Workspace.findOne({ slug }).exec();
    }

    static findUserWorkspaces(userId) {
        return Workspace.find({ "members.user": userId })
            .populate("owner", "username avatarUrl")
            .exec();
    }

    static updateById(id, data) {
        return Workspace.findByIdAndUpdate(id, data, {
            returnDocument: "after",
            runValidators: true,
        }).exec();
    }

    static addMember(workspaceId, memberData) {
        return Workspace.findByIdAndUpdate(
            workspaceId,
            { $push: { members: memberData } },
            { returnDocument: "after" },
        ).exec();
    }

    static removeMember(workspaceId, userId) {
        return Workspace.findByIdAndUpdate(
            workspaceId,
            { $pull: { members: { user: userId } } },
            { returnDocument: "after" },
        ).exec();
    }
}

module.exports = WorkspaceRepository;
