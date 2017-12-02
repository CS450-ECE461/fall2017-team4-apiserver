const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    description: {type: String},
    company_Logo: {type: String},
    title: {type: String},
    contact_Info: {type: String},
    //Location: {}, might need more clarification for location later.
    city: {type: String},
    state: {type: String},
    requirements: {type: String},// ask Nick if this should expect an array.
    _id: {type: String}
});

const COLLECTION_NAME = 'jobs';
const MODEL_NAME = 'job';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);