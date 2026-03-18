"use strict";

const express = require("express");
const authRouter = require("./routers/auth.router");
const userRouter = require("./routers/user.router");
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

// error middleware
app.use(errorMiddleware);

module.exports = app;
