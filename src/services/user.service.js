"use strict";

const { UserRepository } = require("../repositories");
const { NotFoundError, ForbiddenError } = require("../errors");
const { MESSAGES } = require("../constants");
const { deleteImageFromCloudinary } = require("../utils");

const DEFAULT_AVATAR_URL = "https://default-avatar-url.com/avatar.png";

class UserService {
    static async findById(id) {
        const user = await UserRepository.findById(id);

        UserService.#checkUserExists(user);

        return user;
    }

    static async findByUsername(username) {
        const user = await UserRepository.findByUsername(username);

        UserService.#checkUserExists(user);

        return user;
    }

    static async searchUsers(keyword) {
        return await UserRepository.searchUsers(keyword);
    }

    static async updateById(id, data) {
        const updatedUser = await UserRepository.updateById(id, data);

        UserService.#checkUserExists(updatedUser);

        return updatedUser;
    }

    static async updatePassword(id, oldPassword, newPassword) {
        const user = await UserRepository.findByIdWithPassword(id);

        UserService.#checkUserExists(user);

        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            throw new ForbiddenError();
        }

        const updatedUser = await UserRepository.updatePassword(
            id,
            newPassword,
        );

        return updatedUser;
    }

    static async updateOnlineStatus(id, status) {
        const updatedUser = await UserRepository.updateOnlineStatus(id, status);

        UserService.#checkUserExists(updatedUser);

        return updatedUser;
    }

    static async updateLastActive(id) {
        const updatedUser = await UserRepository.updateLastActive(id);

        UserService.#checkUserExists(updatedUser);

        return updatedUser;
    }

    static async updateAvatar(id, avatarUrl) {
        const user = await UserRepository.findById(id);

        UserService.#checkUserExists(user);

        if (user.avatarUrl && user.avatarUrl.includes("cloudinary.com")) {
            await deleteImageFromCloudinary(user.avatarUrl);
        }

        const updatedUser = await UserRepository.updateById(id, {
            avatarUrl,
        });

        return updatedUser;
    }

    static async deleteAvatar(id) {
        const user = await UserRepository.findById(id);

        UserService.#checkUserExists(user);

        if (user.avatarUrl && user.avatarUrl.includes("cloudinary.com")) {
            await deleteImageFromCloudinary(user.avatarUrl);
        }

        const updatedUser = await UserRepository.updateById(id, {
            avatarUrl: DEFAULT_AVATAR_URL,
        });

        return updatedUser;
    }

    static async softDeleteById(id) {
        const deletedUser = await UserRepository.softDeleteById(id);

        if (!deletedUser) {
            throw new NotFoundError(
                MESSAGES.ERROR.USER.NOT_FOUND.message,
                MESSAGES.ERROR.USER.NOT_FOUND.code,
            );
        }

        return deletedUser;
    }

    static async blockUser(userId, targetUserId) {
        if (userId?.toString() === targetUserId?.toString()) {
            throw new ForbiddenError();
        }

        const targetUserExists = await UserRepository.findById(targetUserId);

        UserService.#checkUserExists(targetUserExists);

        const updatedUser = await UserRepository.blockUser(
            userId,
            targetUserId,
        );

        UserService.#checkUserExists(updatedUser);

        return updatedUser;
    }

    static async unblockUser(userId, targetUserId) {
        if (userId?.toString() === targetUserId?.toString()) {
            throw new ForbiddenError();
        }

        const targetUserExists = await UserRepository.findById(targetUserId);

        UserService.#checkUserExists(targetUserExists);

        const updatedUser = await UserRepository.unblockUser(
            userId,
            targetUserId,
        );

        UserService.#checkUserExists(updatedUser);

        return updatedUser;
    }

    // helpers
    static #checkUserExists(user) {
        if (!user || user.isDeleted) {
            throw new NotFoundError(
                MESSAGES.ERROR.USER.NOT_FOUND.message,
                MESSAGES.ERROR.USER.NOT_FOUND.code,
            );
        }
    }
}

module.exports = UserService;
