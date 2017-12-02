module.exports = exports = {
    '/companies' : {
        //post : { action : 'UserController@create' },
        get : { action : 'EmployerController@getCompanies' }
    },
    '/companies/:companyId' : {
        get : { action : 'EmployerController@getCompanyId' }
    },
    '/jobs/:jobId/employees' : {
        get : { action : 'EmployerController@getEmployees' }
    }
}