const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    description: { type: String },
    title: { type: String },
    contactInfo: { type: String },
    location: { type: String },
    requirements: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'jobs';
const MODEL_NAME = 'job';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);