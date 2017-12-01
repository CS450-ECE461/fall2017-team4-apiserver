const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    Description: {type: String},
    Company_Logo: {type: String},
    Title: {type: String},
    Contact_Info: {type: String},
    //Location: {}, might need more clarification for location later.
    city: {type: String},
    State: {type: String},
    Requirements: {type: String},// ask Nick if this should expect an array.
    _id: {type: String}
});

const COLLECTION_NAME = 'jobs';
const MODEL_NAME = 'job';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);