"use strict";

const { User } = require("../models");
const { USER_STATUS } = require("../constants");

class UserRepository {
    static async findById(id) {
        return await User.findById(id).exec();
    }

    static async findByIdWithPassword(id) {
        return await User.findById(id).select("+password").exec();
    }

    static async findByUsername(username) {
        return await User.findOne({ username }).exec();
    }

    static async searchUsers(keyword) {
        const searchRegex = new RegExp(keyword, "i");

        return await User.find({
            $or: [
                { username: searchRegex },
                { firstName: searchRegex },
                { lastName: searchRegex },
            ],
        }).exec();
    }

    static async updateById(id, data) {
        return await User.findByIdAndUpdate(id, data, {
            returnDocument: "after",
            runValidators: true,
        }).exec();
    }

    static async updatePassword(id, password) {
        const user = await User.findById(id).exec();

        if (!user) return null;

        user.password = password;
        return await user.save();
    }

    static async updateOnlineStatus(id, status) {
        return await User.findByIdAndUpdate(
            id,
            { status },
            {
                returnDocument: "after",
                runValidators: true,
            },
        ).exec();
    }

    static async updateLastActive(id) {
        return await User.findByIdAndUpdate(
            id,
            {
                lastActiveAt: Date.now(),
            },
            {
                returnDocument: "after",
            },
        ).exec();
    }

    static async softDeleteById(id) {
        return await User.findByIdAndUpdate(
            id,
            {
                isDeleted: true,
                status: USER_STATUS.OFFLINE,
            },
            {
                returnDocument: "after",
            },
        ).exec();
    }

    static async blockUser(userId, targetUserId) {
        return await User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { blockedUsers: targetUserId },
            },
            {
                returnDocument: "after",
            },
        ).exec();
    }

    static async unblockUser(userId, targetUserId) {
        return await User.findByIdAndUpdate(
            userId,
            {
                $pull: { blockedUsers: targetUserId },
            },
            {
                returnDocument: "after",
            },
        ).exec();
    }
}

module.exports = UserRepository;
