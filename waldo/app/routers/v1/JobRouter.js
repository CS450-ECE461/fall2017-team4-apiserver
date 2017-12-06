module.exports = exports = {
    '/users/:userId/jobs': {
        '/saved': {
            get: { action: 'JobController@getSavedJobs' }
        },
        '/open': {
            get: { action: 'JobController@getOpenJobsByUser' }
        }
    },
    '/jobs/:jobId': {
        get: { action: 'JobController@getJobById' }
    },
    '/jobs/locations': {
        get: { action: 'JobController@getJobsByLocation' }
    }
}