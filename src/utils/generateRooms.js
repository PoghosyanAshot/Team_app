"use strict";

const { ROOM_PREFIXES } = require("../constants/socketEvents");

const generateDmRoomId = (userId1, userId2) => {
    const sortedIds = [userId1.toString(), userId2.toString()].sort();

    return `${ROOM_PREFIXES.DM}${sortedIds[0]}_${sortedIds[1]}`;
};

module.exports = generateDmRoomId;
