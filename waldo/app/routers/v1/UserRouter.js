module.exports = exports = {
    '/users/:accountId' : {
        post : { action : 'UserController@create' },
        get : { action : 'UserController@get' }
    }
}