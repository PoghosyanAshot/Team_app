"use strict";

const { WorkspaceRepository } = require("../repositories");
const { ForbiddenError, NotFoundError } = require("../errors");

const checkWorkspaceRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            const workspaceId = req.params.workspaceId;
            const userId = req.user.id;

            const workspace = await WorkspaceRepository.findById(workspaceId);


            if (!workspace) {
                throw new NotFoundError();
            }

            const member = workspace.members.find(
                (m) => m.user._id.toString() === userId.toString(),
            );

            if (!member || !allowedRoles.includes(member.role)) {
                throw new ForbiddenError();
            }

            req.workspace = workspace;

            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = checkWorkspaceRole;
