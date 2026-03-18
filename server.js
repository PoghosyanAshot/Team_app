"use strict";

const http = require("node:http");
const app = require("./src/app");
const connectMongoDB = require("./src/configs/db");
const { connectRedis } = require("./src/configs/redis");
const ENV = require("./src/configs/env");

const { logger } = require("./src/utils"); 

const HOST = ENV.SERVER.HOST;
const PORT = ENV.SERVER.PORT;

const server = http.createServer(app);

(async () => {
    try {
        await connectMongoDB();
        await connectRedis();

        server.listen(PORT, HOST, () => {
            logger.info(`Server successfully started on http://${HOST}:${PORT}`);
        });

    } catch (error) {
        logger.error(` Server failed to start: ${error.message}`);
        process.exit(1); 
    }
})();
