const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    Description: {type: String},
    Name: {type: String},
    Logo: {type: String},
    //Location: {}, might need more clarification for location later.
    city: {type: String},
    State: {type: String},
    _id: {type: String}
});

const COLLECTION_NAME = 'companies';
const MODEL_NAME = 'company';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);