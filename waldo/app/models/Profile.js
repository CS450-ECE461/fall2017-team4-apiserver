const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = mongodb.Schema({
    headline: { type: String },
    portfolio: { type: String },
    resume: { type: String },
    image: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'profiles';
const MODEL_NAME = 'profile';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);