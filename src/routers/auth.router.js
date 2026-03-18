"use strict";

const { AuthController } = require("../controllers");
const AuthSchema = require("../validators/auth.validation");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const router = require("express").Router();

router.post("/register", validate(AuthSchema.register), AuthController.register);
router.post("/login", validate(AuthSchema.login), AuthController.login);
router.post("/logout", auth(), AuthController.logout);
router.post("/refresh-token", AuthController.refreshToken);

module.exports = router;
