"use strict";

const { UnauthorizedError, ForbiddenError } = require("../errors");
const { Jwt } = require("../utils");

const auth = (allowRoles = []) => {
    return (req, res, next) => {
        try {
            const [type, token] = req.headers.authorization?.split(" ") || [];

            if (type !== "Bearer" || !token) {
                return next(new UnauthorizedError());
            }

            const payload = Jwt.verifyAccessToken(token);

            if (allowRoles.length && !allowRoles.includes(payload.role)) {
                throw new ForbiddenError();
            }

            req.user = {
                id: payload.id,
                role: payload.role,
            };

            next();
        } catch (err) {
            next(err);
        }
    };
};

module.exports = auth;
