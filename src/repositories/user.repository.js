"use strict";

const { User } = require("../models");

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
            $or: [{ username: searchRegex }, { firstName: searchRegex }, { lastName: searchRegex }],
        }).exec();
    }

    static async updateById(id, data) {
        return await User.findByIdAndUpdate(id, data, {
            new: true,
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
                new: true,
                runValidators: true,
            }
        ).exec();
    }

    static async updateLastActive(id) {
        return await User.findByIdAndUpdate(
            id,
            {
                lastActiveAt: Date.now(),
            },
            {
                new: true,
            }
        ).exec();
    }
}

module.exports = UserRepository;
