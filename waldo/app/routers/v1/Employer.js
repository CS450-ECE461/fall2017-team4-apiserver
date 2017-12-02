module.exports = exports = {
    '/companies' : {
        //post : { action : 'UserController@create' },
        get : { action : 'CompanyController@getCompanies' }
    },
    '/companies/:companyId' : {
        get : { action : 'CompanyController@getCompanyId' }
    },
    '/jobs/:jobId/employees' : {
        get : { action : 'ComapanyController@getEmployees' }
    }
}