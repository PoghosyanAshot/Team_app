"use strict";

const Joi = require("joi");
const { REGEX_PATTERNS, MESSAGES, JOI_KEYS } = require("../constants");

const messageValidation = {
    sendMessage: {
        body: Joi.object({
            workspace: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.MESSAGE.WORKSPACE_REQUIRED,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
            channel: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .allow(null)
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),

            content: Joi.string().trim(),

            attachments: Joi.array().items(
                Joi.object({
                    fileUrl: Joi.string().uri().required(),
                    fileType: Joi.string().required(),
                    fileName: Joi.string().required(),
                    fileSize: Joi.number().positive(),
                }),
            ),

            parentMessage: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .allow(null)
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        })
            .or("content", "attachments")
            .messages({
                [JOI_KEYS.MISSING]:
                    MESSAGES.VALIDATION.MESSAGE.CONTENT_OR_ATTACHMENT_REQUIRED,
            }),
    },

    editMessage: {
        params: Joi.object({
            messageId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
        body: Joi.object({
            content: Joi.string()
                .trim()
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]:
                        MESSAGES.VALIDATION.MESSAGE.CONTENT_REQUIRED,
                    [JOI_KEYS.EMPTY]:
                        MESSAGES.VALIDATION.MESSAGE.CONTENT_REQUIRED,
                }),
        }),
    },

    addReaction: {
        params: Joi.object({
            messageId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
        body: Joi.object({
            emoji: Joi.string().required(),
        }),
    },

    getMessages: {
        params: Joi.object({
            channelId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
        query: Joi.object({
            page: Joi.number().integer().min(1).default(1),
            limit: Joi.number().integer().min(1).max(100).default(50),
        }),
    },
};

module.exports = messageValidation;
