"use strict";

const express = require("express");
const router = express.Router();
const { WorkspaceController } = require("../controllers");
const auth = require("../middlewares/auth.middleware");
const checkWorkspaceRole = require("../middlewares/workspaceRole.middleware");
const validate = require("../middlewares/validate.middleware");
const WorkspaceSchema = require("../validators/workspace.validation");
const { ROLES } = require("../constants");

// (POST /api/workspaces)
router.post(
    "/",
    auth(),
    validate(WorkspaceSchema.createWorkspace),
    WorkspaceController.createWorkspace,
);

// (GET /api/workspaces)
router.get("/", auth(), WorkspaceController.getUserWorkspaces);

// (GET /api/workspaces/slug/:slug)
router.get("/slug/:slug", auth(), WorkspaceController.getWorkspaceBySlug);

// (GET /api/workspaces/:id)
router.get("/:id", auth(), WorkspaceController.getWorkspaceById);

// (POST /api/workspaces/members)
router.post(
    "/:workspaceId/members",
    auth(),
    validate(WorkspaceSchema.addMember),
    checkWorkspaceRole([ROLES.ADMIN, ROLES.OWNER]),
    WorkspaceController.addMember,
);

// (PATCH /api/workspaces/:workspaceId)
router.patch(
    "/:workspaceId",
    auth(),
    validate(WorkspaceSchema.updateWorkspace),
    checkWorkspaceRole([ROLES.ADMIN]),
    WorkspaceController.updateWorkspace,
);

// (DELETE /api/workspaces/:workspaceId/members/:userId)
router.delete(
    "/:workspaceId/members/:userId",
    auth(),
    checkWorkspaceRole([ROLES.ADMIN]),
    WorkspaceController.removeMember,
);

module.exports = router;
