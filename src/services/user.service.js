"use strict";

const { UserRepository } = require("../repositories");
const { NotFoundError, ForbiddenError } = require("../errors");
const { MESSAGES } = require("../constants");

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

        const updatedUser = await UserRepository.updatePassword(id, newPassword);

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

    static #checkUserExists(user) {
        if (!user) {
            throw new NotFoundError(
                MESSAGES.ERROR.USER.NOT_FOUND.message,
                MESSAGES.ERROR.USER.NOT_FOUND.code
            );
        }
    }
}

module.exports = UserService;
