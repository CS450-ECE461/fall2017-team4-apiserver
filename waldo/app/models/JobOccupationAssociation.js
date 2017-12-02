const mongodb = require('@onehilltech/blueprint-mongodb');

const schema = mongodb.Schema({
    jobId: {type: String},
    occupationId: {type: String},
    _id: {type: String}
});

const COLLECTION_NAME = 'jobOccupationAssociations';
const MODEL_NAME = 'jobOccupationAssociation';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);