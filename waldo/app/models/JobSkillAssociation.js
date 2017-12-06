const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    skillId: { type: String },
    jobId: { type: String },
    _id: { type: String }
});

const COLLECTION_NAME = 'jobSkillAssociation';
const MODEL_NAME = 'jobSkillAssociations';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);