"use strict";

const express = require("express");
const authRouter = require("./routers/auth.routes");
const userRouter = require("./routers/user.routes");
const workspaceRouter = require("./routers/workspace.routes");
const channelRouter = require("./routers/channel.routes");
const messageRouter = require("./routers/message.routes");
const corsOptions = require("./configs/cors");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const requestLogger = require("./middlewares/requestLogger.middleware");
const errorMiddleware = require("./middlewares/error.middleware");

const app = express();

// global middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(requestLogger);

// routers
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/workspaces", workspaceRouter);
app.use("/api/channels", channelRouter);
app.use("/api/messages", messageRouter);

// error middleware
app.use(errorMiddleware);

module.exports = app;
