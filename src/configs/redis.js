"use strict";

const redis = require("redis");
const ENV = require("./env");
const { logger } = require("../utils");

const redisClient = redis.createClient({
    url: ENV.DB.REDIS_URL,
});

// Redis Event Listeners
redisClient.on("connect", () => {
    logger.info("Redis Client connected to the server.");
});

redisClient.on("error", (err) => {
    logger.error("Redis Client Error:", err);
});

redisClient.on("end", () => {
    logger.info("Redis connection closed.");
});

// Function to establish the connection
const connectRedis = async () => {
    try {
        await redisClient.connect();
        logger.info("Redis connection fully established and ready to use.");
    } catch (error) {
        logger.error("Failed to connect to Redis:", error);
    }
};

module.exports = {
    redisClient,
    connectRedis,
};
