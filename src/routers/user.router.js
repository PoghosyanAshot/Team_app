"use strict";

const { UserController } = require("../controllers");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const UserSchema = require("../validators/user.validation");
const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");

router.get("/me", auth(), UserController.getMe);
router.get("/search", auth(), UserController.searchUsers);
router.get("/:username", auth(), UserController.getUserByUsername);

router.post("/block/:id", auth(), UserController.blockUser);

router.patch(
    "/me",
    auth(),
    validate(UserSchema.updateProfile),
    UserController.updateMe,
);
router.patch(
    "/me/password",
    auth(),
    validate(UserSchema.changePassword),
    UserController.updateMyPassword,
);
router.patch(
    "/me/avatar",
    auth(),
    upload.single("avatar"),
    UserController.updateAvatar,
);
router.delete("/me", auth(), UserController.deleteMe);
router.delete("/me/avatar", auth(), UserController.deleteAvatar);
router.delete("/block/:id", auth(), UserController.unblockUser);

module.exports = router;
