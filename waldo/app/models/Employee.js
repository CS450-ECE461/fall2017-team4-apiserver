const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    Company: {type: String},
    Name: {type: String},
    Phone_Number: {type: String},
    //Location: {}, might need more clarification for location later.
    tite: {type: String},
    _id: {type: String}
});

const COLLECTION_NAME = 'Employees';
const MODEL_NAME = 'Employee';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);