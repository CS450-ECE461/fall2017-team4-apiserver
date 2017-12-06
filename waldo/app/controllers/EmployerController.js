const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

const Company = require('../models/Company');
const EmployeeJobAssociation = require('../models/EmployeeJobAssociation');
const Employee = require('../models/Employee');

class EmployerController {

    constructor() {
        blueprint.BaseController.call(this);
    }

    /**
     * This controller handles getting all companies.
     */
    getAllCompanies() {
        return (req, res) => {
            Company.find({}, {}, (err, companies) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /companies' },
                            title: "Unable to get Company",
                            detail: err
                        }]
                    });
                } else if (companies == null || companies.length == 0) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /companies' },
                            title: "Unable to Find any Companies",
                            detail: "No companies exist"
                        }]
                    });
                } else {
                    res.json({
                        data: companies.map((company) => {
                            return {
                                id: company._id,
                                type: "Company",
                                attributes: company
                            };
                        })
                    });
                }
            });
        };
    }

    /**
     * This controller handles getting a single company by Id.
     * 
     * This will also return all of the jobs in the company as well as all of the employees
     */
    getCompanyById() {
        return (req, res) => {
            Company.findById(req.params._id, {}, (err, company) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /companies/:companyId' },
                            title: "Unable to get Company",
                            detail: err
                        }]
                    });
                } else if (company == null) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /companies/:companyId' },
                            title: "Unable to Find any Companies with that Id\ncompanyId: " + req.params.companyId,
                            detail: "No companies exist"
                        }]
                    });
                } else {
                    Job.find({ companyId: company._id }, {}, (err, jobs) => {
                        if (err) {
                            res.status(500).json({
                                errors: [{
                                    status: 500,
                                    source: { pointer: 'GET /companies/:companyId' },
                                    title: "Unable to get Jobs",
                                    detail: err
                                }]
                            });
                        } else if (jobs == null || jobs.length == 0) {
                            res.status(404).json({
                                errors: [{
                                    status: 404,
                                    source: { pointer: 'GET /companies/:companyId' },
                                    title: "Unable to Find any Jobs with that companyId\ncompanyId: " + req.params.companyId,
                                    detail: "No Jobs found with that companyId"
                                }]
                            });
                        } else {
                            res.json({
                                data: {
                                    id: company._id,
                                    type: "Company",
                                    attributes: company,
                                    relationships: {
                                        jobs: jobs.map((job) => {
                                            return {
                                                data: {
                                                    id: job._id,
                                                    type: "Job"
                                                }
                                            };
                                        })
                                    }
                                },
                                included: jobs
                            });
                        }
                    });
                }
            });
        };
    }

    /**
     * Get a list of employees by jobId
     */
    getEmployeesByJob() {
        return (req, res) => {
            EmployeeJobAssociation.find({ jobId: req.params.jobId }, {}, (err, employeeJobAssociations) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /jobs/:jobId/employees' },
                            title: "Unable to get Employee Association in Company",
                            detail: err
                        }]
                    });
                } else if (employeeJobAssociations == null || employeeJobAssociations.length == 0) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /jobs/:jobId/employees' },
                            title: "Unable to Find any EmployeeAssociations with that jobId\njobd: " + req.params.jobId,
                            detail: "No companies exist"
                        }]
                    });
                } else {
                    let employIds = employeeJobAssociations.map((employeeJobAssociation) => {
                        return employeeJobAssociation.employeeId;
                    });
                    Employee.find({ _id: { $in: employIds } }, {}, (err, employees) => {
                        if (err) {
                            res.status(500).json({
                                errors: [{
                                    status: 500,
                                    source: { pointer: 'GET /jobs/:jobId/employees' },
                                    title: "Unable to get Employees",
                                    detail: err
                                }]
                            });
                        } else if (employees == null || employees.length == 0) {
                            res.status(404).json({
                                errors: [{
                                    status: 404,
                                    source: { pointer: 'GET /companies/:companyId' },
                                    title: "Unable to Find any Employees with that jobId\njobId: " + req.params.jobId,
                                    detail: "No Employees work for that company"
                                }]
                            });
                        } else {
                            res.json({
                                data: employees.map((employee) => {
                                    return {
                                        id: employee._id,
                                        type: "Employee",
                                        attributes: employee
                                    };
                                })
                            });
                        }
                    });
                }
            });

        };
    }
}

blueprint.controller(EmployerController);

module.exports = exports = EmployerController;