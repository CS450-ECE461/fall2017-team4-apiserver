const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    userId: { type: String },
    jobId: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'savedJob';
const MODEL_NAME = 'savedJobs';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);