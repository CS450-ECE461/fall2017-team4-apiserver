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
                        source: {pointer : 'POST /chats'},
                        title: "Unable to Create Conversation",
                        detail: err
                    }]
                });
            } else {
                res.json({
                    data: {
                        id: conversation._id,
                        type: "Coversation"
                    },
                    attributes: conversation
                });
            }
        });
    }

    getMessages() {
        const conversationId = req.params.conversationId;
        Message.find({conversationId: conversationId}, {}, (err, messages) => {
            if (err) {
                res.status(500).json({
                    errors: [{
                        status: 500,
                        source: {pointer : 'GET /chats/:conversationId'},
                        title: "Unable to Find messages of Conversation",
                        detail: err
                    }]
                });
            } else if (messages == null || messages.lenth == 0) {
                res.status(404).json({
                    errors: [{
                        status: 404,
                        source: {pointer : 'GET /chats/:conversationId'},
                        title: "Unable to Find messages of Conversation",
                        detail: "No messages with that conversationId were found\nconversationId: " + conversationId
                    }]
                });
            } else {
                res.json({
                    data: messages.map(m => {
                        return {
                            id: m._id,
                            type: "Message"
                        };
                    }),
                    attributes: messages
                });
            }
        });
    }

    sendMessage() {

    }

    getConversationsByUser() {

    }
}

blueprint.controller(ChatController);

module.exports = exports = ChatController;