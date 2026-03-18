"use strict";

const mongoose = require("mongoose");
const ENV = require("./env");
const { logger } = require("../utils");

const connectMongoDB = async () => {
    try {
        const conn = await mongoose.connect(ENV.DB.MONGO_URI);
        logger.info(`MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

// Listeners for database connection states
mongoose.connection.on("disconnected", () => {
    logger.info("MongoDB disconnected! Trying to reconnect...");
});

mongoose.connection.on("reconnected", () => {
    logger.info("MongoDB reconnected!");
});

module.exports = connectMongoDB;
