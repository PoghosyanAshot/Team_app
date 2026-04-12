"use strict";

const { User } = require("../models");
const { USER_STATUS } = require("../constants");

class UserRepository {
    static findById(id) {
        return User.findById(id).exec();
    }

    static findByIdWithPassword(id) {
        return User.findById(id).select("+password").exec();
    }

    static findByUsername(username) {
        return User.findOne({ username }).exec();
    }

    static searchUsers(keyword) {
        const searchRegex = new RegExp(keyword, "i");

        return User.find({
            $or: [
                { username: searchRegex },
                { firstName: searchRegex },
                { lastName: searchRegex },
            ],
        }).exec();
    }

    static updateById(id, data) {
        return User.findByIdAndUpdate(id, data, {
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

    static updateOnlineStatus(id, status) {
        return User.findByIdAndUpdate(
            id,
            { status },
            {
                returnDocument: "after",
                runValidators: true,
            },
        ).exec();
    }

    static updateLastActive(id) {
        return User.findByIdAndUpdate(
            id,
            {
                lastActiveAt: Date.now(),
            },
            {
                returnDocument: "after",
            },
        ).exec();
    }

    static softDeleteById(id) {
        return User.findByIdAndUpdate(
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

    static blockUser(userId, targetUserId) {
        return User.findByIdAndUpdate(
            userId,
            {
                $addToSet: { blockedUsers: targetUserId },
            },
            {
                returnDocument: "after",
            },
        ).exec();
    }

    static unblockUser(userId, targetUserId) {
        return User.findByIdAndUpdate(
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
