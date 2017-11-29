module.exports = exports = {
    '/educations/:profileId' : {
        post: {action : 'EducationController@add'}

    },
    '/educations/:educationId' : {
        get: {action : 'EducationController@getOne'},
        put: {action : 'EducationController@update'},
        delete: {action : 'EducationController@delete'}
    },
    '/profiles/:profileId/educations': {
        get: {action: 'EducationController@getByProfile'}
    }
};
