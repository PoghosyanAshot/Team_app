"use strict";

const { asyncHandler, successResponse } = require("../utils");
const { BadRequestError } = require("../errors");
const { HTTP_STATUS, MESSAGES } = require("../constants");

const uploadImage = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new BadRequestError();
    }

    return successResponse(
        res,
        HTTP_STATUS.CREATED,
        MESSAGES.SUCCESS.GENERAL.code,
        MESSAGES.SUCCESS.GENERAL.message,
        req.file.path,
    );
});

module.exports = { uploadImage };
