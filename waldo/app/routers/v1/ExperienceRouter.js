module.exports = exports ={
    '/experiences/:profileId' : {
        post: {action : 'ExperienceController@add'}
    },
    '/experiences/:experienceId' : {
        get: {action : 'ExperienceController@getOne'},
        put: {action : 'ExperienceController@update'},
        delete: {action : 'ExperienceController@delete'}
    },
    '/profiles/experiences/:profileId' : {
        get: {action: 'ExperienceController@getByProfile'}
    }
}