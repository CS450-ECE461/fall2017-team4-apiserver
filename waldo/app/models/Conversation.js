const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
  userId: {type: String},
  employeeId: {type: String}, //NOTE: This may be changed to jobId in the future
  _id: {type: String}
});

const COLLECTION_NAME = 'conversations';
const MODEL_NAME = 'conversation';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);