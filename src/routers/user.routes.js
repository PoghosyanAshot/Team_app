"use strict";

const { UserController } = require("../controllers");
const validate = require("../middlewares/validate.middleware");
const auth = require("../middlewares/auth.middleware");
const UserSchema = require("../validators/user.validation");
const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");

// (GET /api/users/me)
router.get("/me", auth(), UserController.getMe);

// (GET /api/users/search)
router.get("/search", auth(), UserController.searchUsers);

// (GET /api/users/:username)
router.get("/:username", auth(), UserController.getUserByUsername);

// (POST /api/users/block/:id)
router.post("/block/:id", auth(), UserController.blockUser);

// (PATCH /api/users/me)
router.patch(
    "/me",
    auth(),
    validate(UserSchema.updateProfile),
    UserController.updateMe,
);

// (PATCH /api/users/me/password)
router.patch(
    "/me/password",
    auth(),
    validate(UserSchema.changePassword),
    UserController.updateMyPassword,
);

// (PATCH /api/users/me/avatar)
router.patch(
    "/me/avatar",
    auth(),
    upload.single("avatar"),
    UserController.updateAvatar,
);

// (DELETE /api/users/me)
router.delete("/me", auth(), UserController.deleteMe);

// (DELETE /api/users/me/avatar)
router.delete("/me/avatar", auth(), UserController.deleteAvatar);

// (DELETE /api/users/block/:id)
router.delete("/block/:id", auth(), UserController.unblockUser);

module.exports = router;
