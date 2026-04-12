"use strict";

const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const ChannelScheme = require("../validators/channel.validation");
const { ChannelController } = require("../controllers");

// (POST /api/channels/workspaces/:workspaceId)
router.post(
    "/workspaces/:workspaceId",
    auth(),
    validate(ChannelScheme.createChannel),
    ChannelController.createChannel,
);

// (GET /api/channels/workspaces/:workspaceId)
router.get(
    "/workspaces/:workspaceId",
    auth(),
    ChannelController.getWorkspaceChannels,
);

// (GET /api/channels/:channelId)
router.get("/:channelId", auth(), ChannelController.getChannelById);

// (PATCH /api/channels/:channelId/workspaces/:workspaceId)
router.patch(
    "/:channelId/workspaces/:workspaceId",
    auth(),
    validate(ChannelScheme.updateChannel),
    ChannelController.updateChannel,
);

// (DELETE /api/channels/:channelId)
router.delete("/:channelId", auth(), ChannelController.deleteChannel);

// (POST /api/channels/:channelId/members)
router.post(
    "/:channelId/members",
    auth(),
    validate(ChannelScheme.addMember),
    ChannelController.addMember,
);

// (DELETE /api/channels/:channelId/members/:memberId)
router.delete(
    "/:channelId/members/:memberId",
    auth(),
    ChannelController.removeMember,
);

// (DELETE /api/channels/:channelId/leave)
router.delete("/:channelId/leave", auth(), ChannelController.leaveChannel);

module.exports = router;
