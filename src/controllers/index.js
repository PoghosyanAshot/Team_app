"use strict";

const AuthController = require("./auth.controller");
const UserController = require("./user.controller");
const WorkspaceController = require("./workspace.controller");
const ChannelController = require("./channel.controller");
const MessageController = require("./message.controller");
const UploadController = require("./upload.controller");

module.exports = {
    AuthController,
    UserController,
    WorkspaceController,
    ChannelController,
    MessageController,
    UploadController,
};
