'use strict';

const dab = require ('@onehilltech/dab');
const ObjectId = require ('@onehilltech/blueprint-mongodb').Types.ObjectId;

const scopes = [
  ["*"],
  [],
  []
];

const LOGIN_CLIENTS = {
  ember: 0,
};

module.exports = {
  clients: dab.times (1, (i, opts, callback) => {
    let clientName = 'ember-waldo';
    let client = {
      _id: "5a02944ad05605078a17da82",
      username: clientName,
      name: clientName,
      client_secret: "eqb16wYXmahv85m5NIPXeiJZDdXZscwlGGABPcBNO7a1mZj0rg_ZB9a_SM705Wcv5OMZVe7B1qO05i8SSjnfWMOAPkfI9n4gKCFeD8GHqu7Vacyhqr6O6bLB5hRXIec0wkpTYDZMSyZh6MbgZn_xhRHTEtIyhyZbNCXUNmWakEI",
      email: clientName + '@waldo.com',
      password: "1234",
      scope: scopes[i],
      type: 'native'
    };

    return callback (null, client);
  }),

  skills: dab.times (20, function(i, opts, callback) {
    const skillName = 'Skill ' + i;
    var skill = {name: skillName};

    return callback(null, skill);
  }),

};
