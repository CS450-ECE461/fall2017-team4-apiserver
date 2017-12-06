module.exports = exports = {
    '/chats': {
        post: { action: 'ChatController@add' }
    },
    '/chats/:conversationId': {
        get: { action: 'ChatController@getMessages' },
        post: { action: 'ChatController@sendMessage' }
    },
    '/chats/:conversationId/latest': {
        get: { action: 'ChatController@getLastMessage' }
    },
    '/users/:userId/chats': {
        get: { action: 'ChatController@getConversationsByUser' }
    }
};