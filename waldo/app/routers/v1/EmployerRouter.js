module.exports = exports = {
    '/companies' : {
        //post : { action : 'UserController@create' },
        get : { action : 'EmployerController@getAllCompanies' }
    },
    '/companies/:companyId' : {
        get : { action : 'EmployerController@getCompanyById' }
    },
    '/jobs/:jobId/employees' : {
        get : { action : 'EmployerController@getEmployeesByJob' }
    }
}