"use strict";

const mongoose = require("mongoose");
const { MESSAGES } = require("../constants");

const reactionSchema = new mongoose.Schema(
    {
        emoji: {
            type: String,
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { _id: false }
);

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, MESSAGES.VALIDATION.MESSAGE.SENDER_REQUIRED],
        },
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: [true, MESSAGES.VALIDATION.MESSAGE.WORKSPACE_REQUIRED],
        },
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            default: null,
        },
        content: {
            type: String,
            required: [
                function () {
                    return !this.attachments || this.attachments.length === 0;
                },
                MESSAGES.VALIDATION.MESSAGE.CONTENT_REQUIRED,
            ],
        },
        attachments: [
            {
                fileUrl: String,
                fileType: String,
                fileName: String,
                fileSize: Number,
            },
        ],
        reactions: [reactionSchema],

        parentMessage: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message",
            default: null,
        },
        replyCount: {
            type: Number,
            default: 0,
        },

        isEdited: {
            type: Boolean,
            default: false,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

messageSchema.index({ channel: 1, createdAt: -1 });
messageSchema.index({ parentMessage: 1, createdAt: 1 });
messageSchema.index({ workspace: 1 });

module.exports = mongoose.model("Message", messageSchema);
