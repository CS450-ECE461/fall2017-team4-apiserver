const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    title: { type: String },
    companyId: { type: String },
    location: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    about: { type: String },
    profileId: { type: String },
    image: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'experiences'
const MODEL_NAME = 'experience';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);