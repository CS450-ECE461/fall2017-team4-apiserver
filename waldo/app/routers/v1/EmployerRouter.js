module.exports = exports = {
    '/employers/:accountId' : {
        post : { action : 'EmployerController@create' },
        get : { action : 'EmployerController@get' }
    }
}