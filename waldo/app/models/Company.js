const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    description: { type: String },
    name: { type: String },
    logo: { type: String },
    location: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'companies';
const MODEL_NAME = 'company';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);