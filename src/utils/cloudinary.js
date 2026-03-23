"use strict";

const cloudinary = require("cloudinary").v2;
const { ServerError } = require("../errors");

const deleteImageFromCloudinary = async (fileUrl) => {
    try {
        if (!fileUrl || !fileUrl.includes("cloudinary.com")) return;

        const parts = fileUrl.split("/");
        const fileNameWithExt = parts.pop();
        const folderName = parts.pop();
        const fileName = fileNameWithExt.split(".")[0];
        const publicId = `${folderName}/${fileName}`;

        await cloudinary.uploader.destroy(publicId);
    } catch (error) {
        throw new ServerError();
    }
};

module.exports = deleteImageFromCloudinary;
