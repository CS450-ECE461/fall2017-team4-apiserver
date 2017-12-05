'use strict';

const mongodb = require ('@onehilltech/blueprint-mongodb')
  ;

var schema = new mongodb.Schema({
  name: {type: String},
  _id: {type: String}
});

const COLLECTION_NAME = 'skills';
const MODEL_NAME = 'skill';

module.exports = mongodb.resource (MODEL_NAME, schema, COLLECTION_NAME);