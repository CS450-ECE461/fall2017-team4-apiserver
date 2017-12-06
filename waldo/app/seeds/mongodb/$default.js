'use strict';

const dab = require('@onehilltech/dab');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

const scopes = [
    ["*"],
    [],
    []
];

const LOGIN_CLIENTS = {
    ember: 0,
};

let skills = ["Java", "C++", "Photoshop", "Python", "PHP", "MySQL", "word", "excel", "time Mangagement", "finger painting", "under water basket weaving", "fire mechanics", "pro-gamer", "Photography", "speech", "HTML", "CSS", "JavaScript", "Perl", "Assembly"]
    //let companies = ["Apple","Microsoft","IBM","Amazon","Google","Cisco","Intel","Oracle","Qualcomm", "SalesForce"]
let ids = ["5a02944ad05618478a1717dj", "6a02944ad05618478a1717dj", "7a02944ad05618478a1717dj", "8a02944ad05618478a1717dj", "9a02944ad05618478a1717dj", "5b02944ad05618478a1717dj", "1a02944ad05618478a1717dj", "2a02944ad05618478a1717dj", "3a02944ad05618478a1717dj", "4a02944ad05618478a1717dj"]
let jobTitles = ["Application Developer", "Database Administrator", "Java Developer", ".NET Developer", "Network Administrator"]
let jobDescriptions = ["work in teams to identify ideas and concepts for the general public", "Database administrators (DBAs) use specialized software to store and organize data, such as financial information and customer shipping records. They make sure that data are available to users and secure from unauthorized access.", "collaborate with web developers and software engineers to integrate Java into business applications, software and websites.  They are involved throughout the entire development life cycle of a product and must be able to identify and analyse any issues or problems and be able to come up with an efficient solution",
    "We are seeking a .NET developer responsible for building .NET applications", "Installing network and computer systems. Maintaining, repairing and upgrading network and computer systems."
]
let companies = [
    { description: "Technology company most known for their phones.", name: "Apple", location: "Cupertino, California", _id: ids[0] },
    { description: "Technology company most known for their gaming console.", name: "Microsoft", location: "Redmond, Washington", _id: ids[1] },
    { description: "Technology company most known for their work in AI.", name: "IBM", location: "Armonk, New York", _id: ids[2] },
    { description: "Technology company most known for AWS and their online shopping website.", name: "Amazon", location: "Seattle, Washington", _id: ids[3] },
    { description: "Technology company most known for their search engine.", name: "Google", location: "Mountain View, California", _id: ids[4] },
    { description: "Technology company most known for their IoT and computer security services.", name: "Cisco", location: "San Jose, California", _id: ids[5] },
    { description: "Technology company most known for their computer chips.", name: "Intel", location: "Santa Clara, California", _id: ids[6] },
    { description: "Technology company most known for their database software.", name: "Oracle", location: "Redwood Shores, California", _id: ids[7] },
    { description: "Technology company most known for their computer chips", name: "Qualcomm", location: "San Diego, California", _id: ids[8] },
    { description: "Technology company most known for their customer relationship management product.", name: "SalesForce", location: "San Francisco, California", _id: ids[9] }
]

let jobs = [
    //{description: "", title: "Software Engineer", contactInfo: "1-800-HR-PERSON", location: "Cupertino, California", requirements: "", _id : ""},
]

//for every company
for (var i = 0; i < 10; i++) {
    //for every type of job
    for (var j = 0; j < 5; j++) {
        //Getting an error for duplicate keys from dab. I'm guessing this is where it is happening.
        jobs.push({ description: jobDescriptions[j], title: jobTitles[j], contactInfo: "(317)917-8844", location: "California", companyId: [i] });
    }

}
module.exports = {
    //creates 'client', or user.
    clients: dab.times(1, (i, opts, callback) => {
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

        return callback(null, client);
    }),

    //creates 20 skills and populates it into the mongodb.
    skills: dab.times(20, (i, opts, callback) => {

        return callback(null, {
            name: skills[i]
        });
    }),

    //create 10 companies and populate it into the mongodb.
    companies: dab.times(10, (i, opts, callback) => {
        return callback(null, companies[i])

    }),

    //create 50 jobs, 5 for each company.
    jobs: dab.times(50, (i, opts, callback) => {
        return callback(null, jobs[i]);

    })



};