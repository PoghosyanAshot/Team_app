"use strict";

const { MessageController } = require("../controllers");
const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const MessageSchema = require("../validators/message.validation");

router.use(auth());

// (POST /api/messages)
router.post(
    "/",
    validate(MessageSchema.sendMessage),
    MessageController.createMessage,
);

// (GET /api/messages/channel/:channelId)
router.get(
    "/channels/:channelId",
    validate(MessageSchema.getMessages),
    MessageController.getChannelMessages,
);

// (GET /api/messages/:parentMessageId/thread)
router.get("/:parentMessageId/thread", MessageController.getThreadMessages);

// (GET /api/messages/:messageId)
router.get("/:messageId", MessageController.getMessageById);

// (PATCH /api/messages/:messageId)
router.patch(
    "/:messageId",
    validate(MessageSchema.editMessage),
    MessageController.updateMessage,
);

// (POST /api/messages/:messageId/reactions)
router.post(
    "/:messageId/reactions",
    validate(MessageSchema.addReaction),
    MessageController.toggleReaction,
);

// (DELETE /api/messages/:messageId)
router.delete("/:messageId", MessageController.deleteMessage);

module.exports = router;
