"use strict";

const Joi = require("joi");
const { VALIDATION_LIMITS, REGEX_PATTERNS, ROLES, MESSAGES, JOI_KEYS } = require("../constants");

const workspaceValidation = {
    createWorkspace: {
        body: Joi.object({
            name: Joi.string()
                .trim()
                .max(VALIDATION_LIMITS.WORKSPACE.NAME_MAX)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.WORKSPACE.NAME_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.WORKSPACE.NAME_REQUIRED,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.WORKSPACE.NAME_LENGTH,
                }),
            slug: Joi.string()
                .trim()
                .lowercase()
                .pattern(REGEX_PATTERNS.WORKSPACE_SLUG)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.WORKSPACE.SLUG_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.WORKSPACE.SLUG_REQUIRED,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.WORKSPACE.SLUG_INVALID,
                }),
        }),
    },

    updateWorkspace: {
        params: Joi.object({
            workspaceId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
        body: Joi.object({
            name: Joi.string()
                .trim()
                .max(VALIDATION_LIMITS.WORKSPACE.NAME_MAX)
                .messages({
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.WORKSPACE.NAME_LENGTH,
                }),
            avatarUrl: Joi.string().uri(),
        }).min(1),
    },

    addMember: {
        params: Joi.object({
            workspaceId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
        body: Joi.object({
            userId: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
            role: Joi.string()
                .valid(...Object.values(ROLES))
                .default(ROLES.MEMBER),
        }),
    },
};

module.exports = workspaceValidation;
