"use strict";

const router = require("express").Router();
const upload = require("../middlewares/upload.middleware");
const auth = require("../middlewares/auth.middleware");
const { UploadController } = require("../controllers");

router.use(auth());

router.post("/image", upload.single("image"), UploadController.uploadImage);

module.exports = router;
