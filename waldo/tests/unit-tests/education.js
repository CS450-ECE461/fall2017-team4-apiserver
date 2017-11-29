const expect = require('chai').expect;
const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const Education = require('../../app/models/User');

const profile = {
    _id: new mongodb.Types.ObjectId()
};

const education = {
    title: "HighSchool",
    schoolName: "CEHS",
    city: "Columbus",
    state: "IN",
    startDate: new Date(2010, 8, 14),
    endDate: new Date(2014, 5, 15),
    about: "It was school"
};

describe('Education Tests', () => {
    describe('Add new Education Entry, ', () => {
        it('Should add new education entry into DB', () => {
            let body = {
                data: {
                    attributes: education
                }
            };
            blueprint.testing.request()
                .post('/v1/educaiton/' + profile._id)
                .send(body)
                .fromClient (0)
                .expect(200)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    expect(res.body.data.type).to.eql('Education');
                    expect(res.body.data.attributes.profileId).to.eql(profile._id);
                });
        });
    });
});