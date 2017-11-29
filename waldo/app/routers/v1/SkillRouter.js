module.exports = exports = {
    '/skills' : {
        post: {action : 'SkillController@add'},
        get: {action : 'SkillController@getAllSkills'}
    },
    '/profiles/:profileId/skills/:skillId' : {
        post: {action : 'SkillController@addNewSkillToProfile'},
        delete: {action : 'SkillController@removeSkillFromProfile'}
    },
    '/profiles/:profileId/skills' : {
        get: {action : 'SkillController@getByProfile'}
    }
}