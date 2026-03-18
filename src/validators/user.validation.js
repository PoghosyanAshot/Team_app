"use strict";

const Joi = require("joi");
const { VALIDATION_LIMITS, REGEX_PATTERNS, MESSAGES, JOI_KEYS } = require("../constants");

const userValidation = {
    updateProfile: {
        body: Joi.object({
            firstName: Joi.string()
                .trim()
                .max(VALIDATION_LIMITS.USER.NAME_MAX)
                .messages({
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.USER.FIRST_NAME_LENGTH,
                }),
            middleName: Joi.string()
                .trim()
                .max(VALIDATION_LIMITS.USER.NAME_MAX)
                .allow("")
                .messages({
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.USER.MIDDLE_NAME_LENGTH,
                }),
            lastName: Joi.string()
                .trim()
                .max(VALIDATION_LIMITS.USER.NAME_MAX)
                .messages({
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.USER.LAST_NAME_LENGTH,
                }),
            avatarUrl: Joi.string().uri(),
            customStatus: Joi.object({
                text: Joi.string().max(VALIDATION_LIMITS.USER.CUSTOM_STATUS_MAX).allow(""),
                emoji: Joi.string().allow(""),
            }),
        }).min(1),
    },

    changePassword: {
        body: Joi.object({
            oldPassword: Joi.string()
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.USER.PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.USER.PASSWORD_REQUIRED,
                }),
            newPassword: Joi.string()
                .min(VALIDATION_LIMITS.USER.PASSWORD_MIN)
                .required()
                .invalid(Joi.ref("oldPassword"))
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.USER.PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.USER.PASSWORD_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.USER.PASSWORD_LENGTH,
                    [JOI_KEYS.INVALID]: MESSAGES.VALIDATION.USER.NEW_PASSWORD_SAME,
                }),
        }),
    },

    getUserById: {
        params: Joi.object({
            id: Joi.string()
                .pattern(REGEX_PATTERNS.OBJECT_ID)
                .required()
                .messages({
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.GENERAL.INVALID_ID,
                }),
        }),
    },
};

module.exports = userValidation;
