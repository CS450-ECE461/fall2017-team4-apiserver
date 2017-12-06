const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    userId: { type: String },
    jobId: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'jobs';
const MODEL_NAME = 'job';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);