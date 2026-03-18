"use strict";

const mongoose = require("mongoose");
const { MESSAGES, VALIDATION_LIMITS } = require("../constants");

const channelSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, MESSAGES.VALIDATION.CHANNEL.NAME_REQUIRED],
            trim: true,
            lowercase: true,
            maxlength: [
                VALIDATION_LIMITS.CHANNEL.NAME_MAX,
                MESSAGES.VALIDATION.CHANNEL.NAME_LENGTH,
            ],
        },
        description: {
            type: String,
            maxlength: [VALIDATION_LIMITS.CHANNEL.DESCRIPTION_MAX, "Description is too long"],
            default: "",
        },
        workspace: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Workspace",
            required: [true, MESSAGES.VALIDATION.CHANNEL.WORKSPACE_REQUIRED],
        },
        isPrivate: {
            type: Boolean,
            default: false,
        },
        members: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        isArchived: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

channelSchema.index({ workspace: 1, name: 1 }, { unique: true });
channelSchema.index({ workspace: 1 });

module.exports = mongoose.model("Channel", channelSchema);
