"use strict";

const { UserController } = require("../controllers");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const UserSchema = require("../validators/user.validation");
const router = require("express").Router();

router.get("/me", auth(), UserController.getMe);
router.get("/search", auth(), UserController.searchUsers);
router.get("/:username", auth(), UserController.getUserByUsername);

router.patch("/me", auth(), validate(UserSchema.updateProfile), UserController.updateMe);
router.patch(
    "/me/password",
    auth(),
    validate(UserSchema.changePassword),
    UserController.updateMyPassword
);

module.exports = router;
