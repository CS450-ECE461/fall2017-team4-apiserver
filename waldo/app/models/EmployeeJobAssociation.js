const mongodb = require('@onehilltech/blueprint-mongodb');

const schema = mongodb.Schema({
    employeeId: {type: String},
    jobId: {type: String},
    _id: {type: String}
});

const COLLECTION_NAME = 'EmployeeJobAssociations';
const MODEL_NAME = 'EmployeeJobAssociation';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);