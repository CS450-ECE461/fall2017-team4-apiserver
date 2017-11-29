'use strict';

const cors = require ('cors');
const gatekeeper = require('@onehilltech/blueprint-gatekeeper');

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  origin: "*"
};

module.exports = {
  '/v1': cors(corsOptions)
};