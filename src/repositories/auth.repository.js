"use strict";

const User = require("../models/User.model");

class AuthRepository {
    static createUser(userData) {
        const user = new User(userData);
        return user.save();
    }

    static findByEmail(email, includePassword = false) {
        const query = User.findOne({ email });

        if (includePassword) {
            query.select("+password");
        }

        return query.exec();
    }

    static findByUsername(username) {
        return User.findOne({ username }).exec();
    }

    static findById(id) {
        return User.findById(id).exec();
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
