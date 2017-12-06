const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    companyId: { type: String },
    name: { type: String },
    phoneNumber: { type: String },
    title: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'Employees';
const MODEL_NAME = 'Employee';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);