module.exports = exports = {
    '/companies': {
        get: { action: 'EmployerController@getAllCompanies' }
    },
    '/companies/:companyId': {
        get: { action: 'EmployerController@getCompanyById' }
    },
    '/jobs/:jobId/employees': {
        get: { action: 'EmployerController@getEmployeesByJob' }
    }
}