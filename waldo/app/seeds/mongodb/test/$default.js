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
  native: dab.times (1, (i, opts, callback) => {
    let clientName = 'ember-waldo';
    let client = {
      _id: "5a02944ad05605078a17da83",
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
  accounts: [
    { email: 'hilljh82@gmail.com', username: 'account1', password: 'account1', created_by: dab.ref ('native.0')}
  ],
  user_tokens: dab.map (dab.get ('accounts'), function (account, opts, callback) {
    const model = {
      client: dab.get ('native.0'),
      account: account._id,
      refresh_token: new ObjectId (),
      scope: account.scope
    };

    return callback (null, model);
  }),

  client_tokens: dab.map (dab.get ('native'), function (client, opts, callback) {
    const token = {client: client._id, scope: client.scope };
    return callback (null, token);
  })
};
