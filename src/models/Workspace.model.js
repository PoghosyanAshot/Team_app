"use strict";

const mongoose = require("mongoose");
const { ROLES, REGEX_PATTERNS, MESSAGES, VALIDATION_LIMITS } = require("../constants");

const workspaceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, MESSAGES.VALIDATION.WORKSPACE.NAME_REQUIRED],
            trim: true,
            maxlength: [
                VALIDATION_LIMITS.WORKSPACE.NAME_MAX,
                MESSAGES.VALIDATION.WORKSPACE.NAME_LENGTH,
            ],
        },
        slug: {
            type: String,
            required: [true, MESSAGES.VALIDATION.WORKSPACE.SLUG_REQUIRED],
            unique: true,
            lowercase: true,
            trim: true,
            match: [REGEX_PATTERNS.WORKSPACE_SLUG, MESSAGES.VALIDATION.WORKSPACE.SLUG_INVALID],
        },
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, MESSAGES.VALIDATION.WORKSPACE.OWNER_REQUIRED],
        },
        members: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                role: {
                    type: String,
                    enum: Object.values(ROLES),
                    default: ROLES.MEMBER,
                },
                joinedAt: {
                    type: Date,
                    default: Date.now,
                },
            },
        ],
        avatarUrl: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

workspaceSchema.index({ "members.user": 1 });

module.exports = mongoose.model("Workspace", workspaceSchema);
