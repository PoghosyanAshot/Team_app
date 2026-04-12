"use strict";

const { MessageRepository } = require("../repositories");
const { NotFoundError, ForbiddenError } = require("../errors");
    
class MessageService {
    static async createMessage(userId, messageData) {
        const safeData = {
            sender: userId,
            workspace: messageData.workspace,
            channel: messageData.channel,
            content: messageData.content,
            attachments: messageData.attachments,
            parentMessage: messageData.parentMessage,
        };

        return await MessageRepository.create(safeData);
    }

    static async findById(id) {
        const message = await MessageRepository.findById(id);

        MessageService.#checkMessageExisting(message);

        return message;
    }

    static async getChannelMessages(channelId, limit = 50, skip = 0) {
        return await MessageRepository.getChannelMessages(
            channelId,
            limit,
            skip,
        );
    }

    static async getThreadMessages(parentMessageId) {
        return await MessageRepository.getThreadMessages(parentMessageId);
    }

    static async updateById(messageId, userId, updateData) {
        const message = await MessageRepository.findById(messageId);

        MessageService.#checkMessageExisting(message);

        if (message.sender._id.toString() !== userId.toString()) {
            throw new ForbiddenError();
        }

        const safeUpdateData = {
            content: updateData.content,
            attachments: updateData.attachments,
        };

        const updatedMessage = await MessageRepository.updateById(
            messageId,
            safeUpdateData,
        );

        return updatedMessage;
    }

    static async toggleReaction(messageId, userId, emoji) {
        const message = await MessageRepository.findById(messageId);

        MessageService.#checkMessageExisting(message);

        const reactionIndex = message.reactions.findIndex(
            (r) => r.emoji === emoji,
        );

        if (reactionIndex > -1) {
            const userIndex = message.reactions[reactionIndex].users.findIndex(
                (id) => id.toString() === userId.toString(),
            );

            if (userIndex > -1) {
                message.reactions[reactionIndex].users.splice(userIndex, 1);

                if (message.reactions[reactionIndex].users.length === 0) {
                    message.reactions.splice(reactionIndex, 1);
                }
            } else {
                message.reactions[reactionIndex].users.push(userId);
            }
        } else {
            message.reactions.push({
                emoji: emoji,
                users: [userId],
            });
        }

        const updatedMessage = await MessageRepository.updateById(messageId, {
            reactions: message.reactions,
        });

        return updatedMessage;
    }

    static async softDeleteById(messageId, userId) {
        const message = await MessageRepository.findById(messageId);

        MessageService.#checkMessageExisting(message);

        if (message.sender._id.toString() !== userId.toString()) {
            throw new ForbiddenError();
        }

        const deletedMessage =
            await MessageRepository.softDeleteById(messageId);

        return deletedMessage;
    }

    static #checkMessageExisting(message) {
        if (!message || message.deletedAt) {
            throw new NotFoundError();
        }
    }
}

module.exports = MessageService;
