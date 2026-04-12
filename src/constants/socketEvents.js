"use strict";

const deepFreeze = require("../utils/deepFreeze");

const SOCKET_EVENTS = deepFreeze({
    // Connection
    CONNECT: "connect",
    DISCONNECT: "disconnect",

    // Rooms
    JOIN_ROOM: "join_room",
    LEAVE_ROOM: "leave_room",

    // Messages
    SEND_MESSAGE: "send_message",
    RECEIVE_MESSAGE: "receive_message",
    MESSAGE_DELETED: "message_deleted",
    MESSAGE_UPDATED: "message_updated",

    // Typing indicators
    TYPING_START: "typing_start",
    TYPING_STOP: "typing_stop",

    // User Status updates
    USER_STATUS_CHANGE: "user_status_change",

    // Reactions
    ADD_REACTION: "add_reaction",
    REMOVE_REACTION: "remove_reaction",
});

const ROOM_PREFIXES = deepFreeze({
    WORKSPACE: "ws_", // e.g., ws_60d5ecb8b3...
    CHANNEL: "channel_", // e.g., channel_60d5ecb8b3...
    DM: "dm_", // e.g., dm_user1Id_user2Id
    USER: "user_", // Personal room for direct notifications
});

module.exports = {
    SOCKET_EVENTS,
    ROOM_PREFIXES,
};
