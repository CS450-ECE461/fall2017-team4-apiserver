module.exports = exports = {
    '/occupations/:profileId' : {
        post: {action : 'OccupationController@add'}

    },
    '/occupations/:occupationId' : {
        get: {action : 'OccupationController@getOne'},
        put: {action : 'OccupationController@update'},
        delete: {action : 'OccupationController@delete'}
    },
    '/profiles/occupations/:profileId': {
        get: {action: 'OccupationController@getByProfile'}
    }
}
