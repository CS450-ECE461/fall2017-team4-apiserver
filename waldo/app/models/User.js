'use strict';

const mongodb = require('@onehilltech/blueprint-mongodb');

var schema = new mongodb.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    location: { type: String },
    radius: { type: Number },
    profileId: { type: String },
    _id: { type: String, required: true }
});

const COLLECTION_NAME = 'users';
const MODEL_NAME = 'user';

module.exports = mongodb.resource(MODEL_NAME, schema, COLLECTION_NAME);