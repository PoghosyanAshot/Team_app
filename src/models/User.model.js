"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
    USER_STATUS,
    REGEX_PATTERNS,
    MESSAGES,
    VALIDATION_LIMITS,
} = require("../constants");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, MESSAGES.VALIDATION.USER.FIRST_NAME_REQUIRED],
            trim: true,
            maxlength: [
                VALIDATION_LIMITS.USER.NAME_MAX,
                MESSAGES.VALIDATION.USER.FIRST_NAME_LENGTH,
            ],
        },
        lastName: {
            type: String,
            required: [true, MESSAGES.VALIDATION.USER.LAST_NAME_REQUIRED],
            trim: true,
            maxlength: [
                VALIDATION_LIMITS.USER.NAME_MAX,
                MESSAGES.VALIDATION.USER.LAST_NAME_LENGTH,
            ],
        },
        username: {
            type: String,
            required: [true, MESSAGES.VALIDATION.USER.USERNAME_REQUIRED],
            unique: true,
            trim: true,
            lowercase: true,
            minlength: [
                VALIDATION_LIMITS.USER.USERNAME_MIN,
                MESSAGES.VALIDATION.USER.USERNAME_LENGTH,
            ],
            maxlength: [
                VALIDATION_LIMITS.USER.USERNAME_MAX,
                MESSAGES.VALIDATION.USER.USERNAME_LENGTH,
            ],
            match: [
                REGEX_PATTERNS.USERNAME,
                MESSAGES.VALIDATION.USER.USERNAME_INVALID,
            ],
        },
        email: {
            type: String,
            required: [true, MESSAGES.VALIDATION.USER.EMAIL_REQUIRED],
            unique: true,
            lowercase: true,
            trim: true,
            match: [
                REGEX_PATTERNS.EMAIL,
                MESSAGES.VALIDATION.USER.EMAIL_INVALID,
            ],
        },
        password: {
            type: String,
            required: [true, MESSAGES.VALIDATION.USER.PASSWORD_REQUIRED],
            minlength: [
                VALIDATION_LIMITS.USER.PASSWORD_MIN,
                MESSAGES.VALIDATION.USER.PASSWORD_LENGTH,
            ],
            select: false,
        },
        role: {
            type: String,
            required: [true, MESSAGES.VALIDATION.USER.ROLE_REQUIRED],
            enum: ["admin", "user"],
            default: "user",
        },
        avatarUrl: {
            type: String,
            default: "https://default-avatar-url.com/avatar.png",
        },
        status: {
            type: String,
            enum: Object.values(USER_STATUS),
            default: USER_STATUS.OFFLINE,
        },
        customStatus: {
            text: {
                type: String,
                maxlength: [
                    VALIDATION_LIMITS.USER.CUSTOM_STATUS_MAX,
                    MESSAGES.VALIDATION.USER.CUSTOM_STATUS_MAX,
                ],
                default: "",
            },
            emoji: {
                type: String,
                default: "",
            },
        },
        blockedUsers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],
        isDeleted: {
            type: Boolean,
            default: false,
        },
        lastActiveAt: {
            type: Date,
            default: Date.now,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: function (doc, ret) {
                delete ret.password;
                delete ret.__v;
                return ret;
            },
        },
    },
);

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

userSchema.index({ firstName: 1, lastName: 1 });

module.exports = mongoose.model("User", userSchema);
