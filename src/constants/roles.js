"use strict";

const { deepFreeze } = require("../utils");

const ROLES = deepFreeze({
    ADMIN: "admin", // Workspace administrator
    MEMBER: "member", // Regular workspace member
});

const USER_STATUS = deepFreeze({
    ONLINE: "online",
    OFFLINE: "offline",
    AWAY: "away",
    BUSY: "busy",
});

module.exports = {
    ROLES,
    USER_STATUS,
};
