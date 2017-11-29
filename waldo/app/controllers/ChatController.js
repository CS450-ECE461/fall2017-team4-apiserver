const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

class ChatController {

    constructor() {
        blueprint.BaseController.call(this);
    }

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

    }

    sendMessage() {

    }

    getConversationsByUser() {

    }
}

blueprint.controller(ChatController);

module.exports = exports = ChatController;