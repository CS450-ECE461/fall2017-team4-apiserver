module.exports = exports = {
    '/chats' : {
        post : {action : 'ChatController@add'}
    },
    '/chats/:conversationId' : {
        get : {action : 'ChatController@getMessages'},
        post : {action : 'ChatController@sendMessage'}
    },
    '/users/:userId/chats' : {
        get : {action : 'ChatController@getConversationsByUser'}
    }
};
