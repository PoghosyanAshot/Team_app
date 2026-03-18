"use strict";

const User = require("../models/User.model");

class AuthRepository {
    static async createUser(userData) {
        const user = new User(userData);
        return await user.save();
    }

    static async findByEmail(email, includePassword = false) {
        const query = User.findOne({ email });

        if (includePassword) {
            query.select("+password");
        }

        return await query.exec();
    }

    static async findByUsername(username) {
        return await User.findOne({ username }).exec();
    }

    static async findById(id) {
        return await User.findById(id).exec();
    }

    static async existsByEmail(email) {
        const result = await User.exists({ email });
        return result !== null;
    }

    static async existsByUsername(username) {
        const result = await User.exists({ username });
        return result !== null;
    }
}

module.exports = AuthRepository;
