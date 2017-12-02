const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

class EmployerController {

    constructor() {
        blueprint.BaseController.call(this);
    }

    /**
     * This controller handles getting all companies.
     */
    getAllCompanies() {
        return (req, res) => {

        };
    }

    /**
     * This controller handles getting a single company by Id.
     * 
     * This will also return all of the jobs in the company as well as all of the employees
     */
    getCompanyById() {
        return (req, res) => {

        };
    }

    /**
     * Get a list of employees by jobId
     */
    getEmployeesByJob() {
        return (req, res) => {

        };
    }
}