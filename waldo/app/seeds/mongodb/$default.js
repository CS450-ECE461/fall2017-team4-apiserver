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

let skills = ["Java","C++","Photoshop","Python","PHP","MySQL","word","excel","time Mangagement","finger painting","under water basket weaving","fire mechanics","pro-gamer","Photography","speech","HTML","CSS","JavaScript","Perl","Assembly"]
//let companies = ["Apple","Microsoft","IBM","Amazon","Google","Cisco","Intel","Oracle","Qualcomm"]
let companies = 
[
  {"description" : "Technology company most known for their phones.", "name" : "Apple", "location" : "Cupertino, California", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their gaming console.", "name" : "Microsoft", "location" : "Redmond, Washington", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their work in AI.", "name" : "IBM", "location" : "Armonk, New York", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for AWS and their online shopping website.", "name" : "Amazon", "location" : "Seattle, Washington", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their search engine.", "name" : "Google", "location" : "Mountain View, California", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their IoT and computer security services.", "name" : "Cisco", "location" : "San Jose, California", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their computer chips.", "name" : "Intel", "location" : "Santa Clara, California", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their database software.", "name" : "Oracle", "location" : "Redwood Shores, California", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their computer chips", "name" : "Qualcomm", "location" : "San Diego, California", "_id" : "5a02944ad05618478a1717dj"},
  {"description" : "Technology company most known for their customer relationship management product.", "name" : "SalesForce", "location" : "San Francisco, California", "_id" : "5a02944ad05618478a1717dj"}
]
module.exports = {
  //creates 'client', or user.
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

  //creates 20 skills and populates it into the mongodb.
  skills: dab.times (20, (i, opts, callback)  => {

    return callback(null, {
      name: skills[i]
    });
  }),

  //create 10 companies and populate it into the mongodb.
  companies: dab.times(10, (i, opts, callback) => {
    return callback(null, companies[i])

  })

  

};
