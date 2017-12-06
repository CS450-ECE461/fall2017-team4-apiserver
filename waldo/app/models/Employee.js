const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    companyId: { type: String },
    name: { type: String },
    phoneNumber: { type: String },
    title: { type: String },
    image: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'employees';
const MODEL_NAME = 'employee';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);