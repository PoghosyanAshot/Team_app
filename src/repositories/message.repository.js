"use strict";

const { Message } = require("../models");

class MessageRepository {
    static create(messageData) {
        const message = new Message(messageData);
        return message.save();
    }

    static findById(id) {
        return Message.findById(id)
            .populate("sender", "username avatarUrl firstName lastName")
            .exec();
    }

    static getChannelMessages(channelId, limit = 50, skip = 0) {
        return Message.find({ channel: channelId, parentMessage: null })
            .sort({ createdAt: -1 }) 
            .skip(skip)
            .limit(limit)
            .populate("sender", "username avatarUrl firstName lastName")
            .exec();
    }

    static getThreadMessages(parentMessageId) {
        return Message.find({ parentMessage: parentMessageId })
            .sort({ createdAt: 1 }) 
            .populate("sender", "username avatarUrl firstName lastName")
            .exec();
    }

    static updateById(id, updateData) {
        const dataToUpdate = { ...updateData, isEdited: true };
        
        return Message.findByIdAndUpdate(id, dataToUpdate, {
            returnDocument: "after",
            runValidators: true,
        })
            .populate("sender", "username avatarUrl firstName lastName")
            .exec();
    }

    static softDeleteById(id) {
        return Message.findByIdAndUpdate(
            id,
            { deletedAt: new Date() }, 
            { returnDocument: "after" }
        ).exec();
    }
}

module.exports = MessageRepository;