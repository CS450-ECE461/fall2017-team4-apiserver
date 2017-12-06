const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

class ChatController {

    constructor() {
        blueprint.BaseController.call(this);
    }

    /**
     * This controller handles the creation of a new Conversation.
     */
    add() {
        return (req, res) => {
            const newConversation = req.body.data.attributes;
            Conversation.create({
                userId: newConversation.userId,
                employeeId: newConversation.employeeId,
                _id: new ObjectId()
            }, (err, conversation) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'POST /chats' },
                            title: "Unable to Create Chat",
                            detail: err
                        }]
                    });
                } else {
                    res.json({
                        data: {
                            id: conversation._id,
                            type: "Chat",
                            attributes: conversation
                        },
                    });
                }
            });
        };
    }

    getMessages() {
        return (req, res) => {
            const conversationId = req.params.conversationId;
            Message.find({ conversationId: conversationId }, {}, (err, messages) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /chats/:conversationId' },
                            title: "Unable to Find messages of Conversation",
                            detail: err
                        }]
                    });
                } else if (messages == null /*|| messages.length == 0*/ ) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /chats/:conversationId' },
                            title: "Unable to Find messages of Conversation",
                            detail: "No messages with that conversationId were found\nconversationId: " + conversationId
                        }]
                    });
                } else {
                    res.json({
                        data: messages.map(m => {
                            return {
                                id: m._id,
                                type: "Message",
                                attributes: m
                            };
                        })
                    });
                }
            });
        };
    }

    sendMessage() {
        return (req, res) => {
            const conversationId = req.params.conversationId;
            const newMessage = req.body.data.attributes;
            Message.create({
                conversationId: conversationId,
                body: newMessage.body,
                fromId: newMessage.fromId,
                timestamp: new Date(),
                _id: new ObjectId()
            }, (err, message) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'POST /chats/:conversationId' },
                            title: "Unable to Send Message",
                            detail: err
                        }]
                    });
                } else {
                    res.json({
                        data: {
                            id: message._id,
                            type: "Message",
                            attributes: message
                        },
                    });
                }
            });
        };
    }

    getConversationsByUser() {
        return (req, res) => {
            const userId = req.params.userId;
            Conversation.find({ userId: userId }, {}, (err, conversations) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /users/:userId/chats' },
                            title: "Unable to Find Conversations from User",
                            detail: err
                        }]
                    });
                } else if (conversations == null || conversations.length == 0) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /users/:userId/chats' },
                            title: "Unable to Find Conversations from User",
                            detail: "No Conversations with that userId were found\nuserId: " + userId
                        }]
                    });
                } else {
                    res.json({
                        data: conversations.map((conversation) => {
                            return {
                                id: conversation._id,
                                type: "Chat",
                                attributes: conversation
                            };
                        })
                    });
                }
            });
        };
    }

    getLastMessage() {
        return (req, res) => {
            Message.find({ conversationId: req.params.conversationId }, {}, {
                    skip: 0, // Starting Row
                    limit: 1, // Ending Row
                    sort: {
                        timestamp: -1
                    }
                },
                (err, message) => {
                    if (err) {
                        res.status(500).json({
                            errors: [{
                                status: 500,
                                source: { pointer: 'GET /chats/:conversationId/latest' },
                                title: "Unable to latest messages of Conversation",
                                detail: err
                            }]
                        });
                    } else if (message == null || message.length == 0 || message[0] == null) {
                        res.status(404).json({
                            errors: [{
                                status: 404,
                                source: { pointer: 'GET /chats/:conversationId/latest' },
                                title: "Unable to Find messages of Conversation",
                                detail: "No messages with that conversationId were found\nconversationId: " + conversationId
                            }]
                        });
                    } else {
                        res.json({
                            data: {
                                id: message._id,
                                type: "Message",
                                attributes: message[0]
                            }
                        });
                    }
                });
        }
    }
}

blueprint.controller(ChatController);

module.exports = exports = ChatController;