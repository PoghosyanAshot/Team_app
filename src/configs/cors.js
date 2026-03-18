"use strict";

const corsOptions = {
    origin: "http://localhost:5500",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
};

module.exports = corsOptions;
