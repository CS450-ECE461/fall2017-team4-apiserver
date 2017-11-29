const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
  name: {type: String},
  profileId: {type: String},
  _id: {type: String}
});

const COLLECTION_NAME = 'occupations';
const MODEL_NAME = 'occupation';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);