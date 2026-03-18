"use strict";

const REGEX_PATTERNS = {
    // Validates email format
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

    // Password: Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    PASSWORD_STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

    // Username: 3 to 20 characters, letters, numbers, underscores only
    USERNAME: /^[a-zA-Z0-9_]{3,20}$/,

    // Workspace Slug: letters, numbers, hyphens only, lowercase
    WORKSPACE_SLUG: /^[a-z0-9-]+$/,

    // Validates standard URLs
    URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

    // ObjectId
    OBJECT_ID: /^[0-9a-fA-F]{24}$/,
};

module.exports = REGEX_PATTERNS;
