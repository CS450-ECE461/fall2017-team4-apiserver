const mongodb = require('@onehilltech/blueprint-mongodb');

const schema = mongodb.Schema({
    profileId: {type: String},
    skillId: {type: String},
    _id: {type: String}
});

const COLLECTION_NAME = 'profileSkillAssociations';
const MODEL_NAME = 'profileSkillAssociation';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);