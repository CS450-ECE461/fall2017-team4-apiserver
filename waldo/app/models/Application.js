const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    content: {type: String},
    date: {type: Date},
    jobId: {type: String},
    userId: {type: String}, // profileId?
    _id: {type: String}
});

const COLLECTION_NAME = 'applications'
const MODEL_NAME = 'application';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);
