"use strict";

const Joi = require("joi");
const { VALIDATION_LIMITS, REGEX_PATTERNS, MESSAGES, JOI_KEYS } = require("../constants");

const channelValidation = {
    createChannel: {
        body: Joi.object({
            name: Joi.string()
                .trim()
                .lowercase()
                .max(VALIDATION_LIMITS.CHANNEL.NAME_MAX)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.CHANNEL.NAME_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.CHANNEL.NAME_REQUIRED,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.CHANNEL.NAME_LENGTH,
                }),
            description: Joi.string().max(VALIDATION_LIMITS.CHANNEL.DESCRIPTION_MAX).allow(""),
            workspace: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.CHANNEL.WORKSPACE_REQUIRED,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
            isPrivate: Joi.boolean().default(false),
            members: Joi.array()
                .items(
                    Joi.string()
                        .pattern(REGEX_PATTERNS.OBJECT_ID)
                        .messages({
                            [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                        })
                )
                .unique(),
        }),
    },

    updateChannel: {
        params: Joi.object({
            channelId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
        body: Joi.object({
            name: Joi.string()
                .trim()
                .lowercase()
                .max(VALIDATION_LIMITS.CHANNEL.NAME_MAX)
                .messages({
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.CHANNEL.NAME_LENGTH,
                }),
            description: Joi.string().max(VALIDATION_LIMITS.CHANNEL.DESCRIPTION_MAX).allow(""),
            isArchived: Joi.boolean(),
        }).min(1),
    },

    addMembers: {
        params: Joi.object({
            channelId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
        body: Joi.object({
            userIds: Joi.array()
                .items(
                    Joi.string()
                        .pattern(REGEX_PATTERNS.OBJECT_ID)
                        .required()
                        .messages({
                            [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                        })
                )
                .min(1)
                .unique()
                .required(),
        }),
    },
};

module.exports = channelValidation;
