'use strict';

const mongodb = require ('@onehilltech/blueprint-mongodb')
  ;

var schema = mongodb.Schema({
  headline: {type: String},
  isNull: {type: Boolean},
  portfolio: {type: String},
  resume: {type: String},
  _id: {type: String}
});

const COLLECTION_NAME = 'profiles';
const MODEL_NAME = 'profile';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);