"use strict";

const deepFreeze = require("../utils/deepFreeze");

const MESSAGES = deepFreeze({
    // success messages
    SUCCESS: {
        GENERAL: {
            code: "SUC_GEN_001",
            message: "Operation completed successfully.",
        },
        AUTH: {
            REGISTER: {
                code: "SUC_AUTH_001",
                message: "User registered successfully.",
            },
            LOGIN: {
                code: "SUC_AUTH_002",
                message: "User logged in successfully.",
            },
            LOGOUT: {
                code: "SUC_AUTH_003",
                message: "User logged out successfully.",
            },
        },
        WORKSPACE: {
            CREATED: {
                code: "SUC_WS_001",
                message: "Workspace created successfully.",
            },
            JOINED: {
                code: "SUC_WS_002",
                message: "Joined workspace successfully.",
            },
        },
        CHANNEL: {
            CREATED: {
                code: "SUC_CH_001",
                message: "Channel created successfully.",
            },
        },
        MESSAGE: {
            SENT: {
                code: "SUC_MSG_001",
                message: "Message sent successfully.",
            },
            DELETED: {
                code: "SUC_MSG_002",
                message: "Message deleted successfully.",
            },
        },
    },

    // error messages
    ERROR: {
        GENERAL: {
            SERVER_ERROR: {
                code: "ERR_GEN_500",
                message: "Internal server error occurred.",
            },
            BAD_REQUEST: {
                code: "ERR_GEN_400",
                message: "Invalid request data provided.",
            },
            NOT_FOUND: {
                code: "ERR_GEN_404",
                message: "Requested resource not found.",
            },
            UNAUTHORIZED: {
                code: "ERR_GEN_401",
                message: "Unauthorized access.",
            },
            FORBIDDEN: {
                code: "ERR_GEN_403",
                message: "You do not have permission for this action.",
            },
        },

        // JWT & Authentication Errors
        AUTH: {
            INVALID_CREDENTIALS: {
                code: "ERR_AUTH_001",
                message: "Invalid email or password.",
            },
            TOKEN_MISSING: {
                code: "ERR_AUTH_002",
                message: "Authentication token is missing.",
            },
            TOKEN_EXPIRED: {
                code: "ERR_AUTH_003",
                message:
                    "Authentication token has expired. Please login again.",
            },

            // Specific JWT error
            TOKEN_INVALID: {
                code: "ERR_AUTH_004",
                message: "Authentication token is invalid.",
            },

            // Specific JWT error
            EMAIL_NOT_VERIFIED: {
                code: "ERR_AUTH_005",
                message: "Please verify your email address first.",
            },
        },

        // Validation & User Errors
        USER: {
            EMAIL_EXISTS: {
                code: "ERR_USR_001",
                message: "User with this email already exists.",
            },
            USERNAME_EXISTS: {
                code: "ERR_USR_002",
                message: "User with this username already exists.",
            },
            NOT_FOUND: {
                code: "ERR_USR_003",
                message: "User not found.",
            },
            WEAK_PASSWORD: {
                code: "ERR_USR_004",
                message: "Password does not meet complexity requirements.",
            },
        },

        // Workspace Errors
        WORKSPACE: {
            NOT_FOUND: {
                code: "ERR_WS_001",
                message: "Workspace not found.",
            },
            SLUG_TAKEN: {
                code: "ERR_WS_002",
                message: "Workspace URL (slug) is already taken.",
            },
            ALREADY_MEMBER: {
                code: "ERR_WS_003",
                message: "User is already a member of this workspace.",
            },
            ALREADY_EXISTS: {
                code: "ERR_WS_004",
                message: "Workspace with this slug is already exists",
            },
        },

        // Channel Errors
        CHANNEL: {
            NOT_FOUND: {
                code: "ERR_CH_001",
                message: "Channel not found.",
            },
            NAME_TAKEN: {
                code: "ERR_CH_002",
                message: "Channel name already exists in this workspace.",
            },
            PRIVATE_ACCESS_DENIED: {
                code: "ERR_CH_003",
                message: "You do not have access to this private channel.",
            },
        },

        // Database / MongoDB Specific Errors
        DATABASE: {
            // 11000 is standard MongoDB duplicate key error code
            DUPLICATE_KEY: {
                code: "ERR_DB_11000",
                message: "A duplicate record was found in the database.",
            },
            VALIDATION_FAILED: {
                code: "ERR_DB_VAL",
                message: "Database schema validation failed.",
            },

            // Mongoose invalid ObjectId error
            CAST_ERROR: {
                code: "ERR_DB_CAST",
                message: "Invalid ID format provided.",
            },
        },
    },

    // validation messages
    VALIDATION: {
        GENERAL: {
            INVALID_ID: "The given id was invalid",
        },
        USER: {
            FIRST_NAME_REQUIRED: "First name is required.",
            FIRST_NAME_LENGTH: "First name cannot exceed 50 characters.",
            LAST_NAME_REQUIRED: "Last name is required.",
            LAST_NAME_LENGTH: "Last name cannot exceed 50 characters.",
            MIDDLE_NAME_LENGTH: "Middle name cannot exceed 50 characters.",
            USERNAME_REQUIRED: "Username is required.",
            USERNAME_LENGTH: "Username must be between 3 and 30 characters.",
            USERNAME_INVALID:
                "Invalid username format. Only letters, numbers, and underscores are allowed.",
            EMAIL_REQUIRED: "Email is required.",
            EMAIL_INVALID: "Please provide a valid email address.",
            PASSWORD_REQUIRED: "Password is required.",
            ROLE_REQUIRED: "Role is required",
            PASSWORD_LENGTH: "Password must be at least 8 characters long.",
            CUSTOM_STATUS_MAX: "Status text is too long",
            NEW_PASSWORD_SAME:
                "New password must be different from the old password.",
        },
        AUTH: {
            LOGIN_EMAIL_REQUIRED: "Email is required to login.",
            LOGIN_PASSWORD_REQUIRED: "Password is required to login.",
        },
        WORKSPACE: {
            NAME_REQUIRED: "Workspace name is required.",
            NAME_LENGTH: "Workspace name cannot exceed 50 characters.",
            SLUG_REQUIRED: "Workspace slug (URL) is required.",
            SLUG_INVALID:
                "Invalid slug format. Only lowercase letters, numbers, and hyphens are allowed.",
            OWNER_REQUIRED: "Workspace must have an owner.",
        },
        CHANNEL: {
            NAME_REQUIRED: "Channel name is required.",
            NAME_LENGTH: "Channel name cannot exceed 80 characters.",
            WORKSPACE_REQUIRED: "Channel must belong to a workspace.",
        },
        MESSAGE: {
            SENDER_REQUIRED: "Message must have a sender.",
            WORKSPACE_REQUIRED: "Message must belong to a workspace.",
            CONTENT_REQUIRED:
                "Message content is required if there are no attachments.",
            CONTENT_OR_ATTACHMENT_REQUIRED:
                "You must provide either text content or an attachment to send a message.",
        },
    },
});

module.exports = MESSAGES;
