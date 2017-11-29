const mongodb = require ('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
  conversationId : {type: String},
  body : {type: String},
  fromId : {type: String},
  timestamp : {type : Date},
  _id: {type: String}
});

const COLLECTION_NAME = 'messages';
const MODEL_NAME = 'message';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);