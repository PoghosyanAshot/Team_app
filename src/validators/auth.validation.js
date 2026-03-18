"use strict";

const Joi = require("joi");
const { VALIDATION_LIMITS, REGEX_PATTERNS, MESSAGES, JOI_KEYS } = require("../constants");

const authValidation = {
    register: {
        body: Joi.object({
            firstName: Joi.string()
                .trim()
                .max(VALIDATION_LIMITS.USER.NAME_MAX)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.USER.FIRST_NAME_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.USER.FIRST_NAME_REQUIRED,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.USER.FIRST_NAME_LENGTH,
                }),

            lastName: Joi.string()
                .trim()
                .max(VALIDATION_LIMITS.USER.NAME_MAX)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.USER.LAST_NAME_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.USER.LAST_NAME_REQUIRED,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.USER.LAST_NAME_LENGTH,
                }),

            username: Joi.string()
                .trim()
                .lowercase()
                .min(VALIDATION_LIMITS.USER.USERNAME_MIN)
                .max(VALIDATION_LIMITS.USER.USERNAME_MAX)
                .pattern(REGEX_PATTERNS.USERNAME)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.USER.USERNAME_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.USER.USERNAME_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.USER.USERNAME_LENGTH,
                    [JOI_KEYS.MAX]: MESSAGES.VALIDATION.USER.USERNAME_LENGTH,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.USER.USERNAME_INVALID,
                }),

            email: Joi.string()
                .trim()
                .lowercase()
                .pattern(REGEX_PATTERNS.EMAIL)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.USER.EMAIL_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.USER.EMAIL_REQUIRED,
                    [JOI_KEYS.PATTERN]: MESSAGES.VALIDATION.USER.EMAIL_INVALID,
                }),

            password: Joi.string()
                .min(VALIDATION_LIMITS.USER.PASSWORD_MIN)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.USER.PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.USER.PASSWORD_REQUIRED,
                    [JOI_KEYS.MIN]: MESSAGES.VALIDATION.USER.PASSWORD_LENGTH,
                }),
        }),
    },

    login: {
        body: Joi.object({
            email: Joi.string()
                .pattern(REGEX_PATTERNS.EMAIL)
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.AUTH.LOGIN_EMAIL_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.AUTH.LOGIN_EMAIL_REQUIRED,
                }),
            password: Joi.string()
                .required()
                .messages({
                    [JOI_KEYS.REQUIRED]: MESSAGES.VALIDATION.AUTH.LOGIN_PASSWORD_REQUIRED,
                    [JOI_KEYS.EMPTY]: MESSAGES.VALIDATION.AUTH.LOGIN_PASSWORD_REQUIRED,
                }),
        }),
    },
};

module.exports = authValidation;
