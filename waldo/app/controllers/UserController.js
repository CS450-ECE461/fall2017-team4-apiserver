let blueprint = require('@onehilltech/blueprint');
let mongodb = require('@onehilltech/blueprint-mongodb');
let util = require('util');
let User = require('../models/User');
let Profile = require('../models/Profile');
let Education = require('../models/Education');
let Experience = require('../models/Experience');
let Occupation = require('../models/Occupation');
let Skill = require('../models/Skill');

class UserController {
    constructor() {
        blueprint.BaseController.call(this);
    }


    /**
     * This function returns a user given an accountId.
    */
    get() {
        return (req, res) => {
            User.findOne({_id: req.params.accountId}, {}, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                } else if (user == null) {
                    res.status(404).send("User Not found")
                } else {

                    Profile.findOne({_id: user.profileId}, {},(err, profile) => {
                        if (err) {
                            res.status(500).send(err);
                        } else if (profile == null) {
                            res.status(404).send("User Not found")
                        } else {

                            Education.find({profileId: profile._id}, {}, (err, education) => {
                                if (err) {
                                    res.status(500).send(err);
                                }

                                Experience.find({profileId: profile._id}, {}, (err, expirience) => {
                                    if (err) {
                                        res.status(500).send(err);
                                    }

                                    Occupation.find({profileId: profile._id}, {}, (err, occupation) => {
                                        if (err) {
                                            res.status(500).send(err);
                                        }

                                        Skill.find({profileId: profile._id}, {}, (err, skill) => {
                                            if (err) {
                                                res.status(500).send(err);
                                            }

                                            let included = [];
                                            included.push({
                                                type: "Profile",
                                                id: profileId,
                                                attributes: profile,
                                                relationships: {
                                                    skills: {
                                                        data: skill.map(s => {
                                                            return {
                                                                type: "Skill",
                                                                id: s._id
                                                            };
                                                        })
                                                    },
                                                    occupations: {
                                                        data: occupation.map(o => {
                                                            return {
                                                                type: "Occupation",
                                                                id: o._id
                                                            };
                                                        })
                                                    },
                                                    education: {
                                                        data: education.map(e => {
                                                            return {
                                                                type: "Education",
                                                                id: e._id
                                                            };
                                                        })
                                                    },
                                                    experience: {
                                                        data: expirience.map(e => {
                                                            return {
                                                                type: "Expirience",
                                                                id: e._id
                                                            };
                                                        })
                                                    }                      
                                                }
                                            });

                                            included.concat(skill);
                                            included.concat(occupation);
                                            included.concat(education);
                                            included.concat(expirience);

                                            res.json({
                                                data: {
                                                    id: user._id,
                                                    type: "User",
                                                    attributes: user,
                                                    relationships: {
                                                        profile: {
                                                            data: {
                                                                id: profileId,
                                                                type: "Profile"
                                                            }
                                                        }
                                                    }
                                                },
                                                included: included
                                            });
                                        });
                                    });
                                });
                            });
                        }
                    });
                }
            });
        };
    };

    /**
     * Returns a JSON containing user information. 
    */
    create() {
        return (req, res) => {
            
            if (req.body && req.body.data && req.body.data.attributes) {

                const userData = {
                    firstName: req.body.data.attributes.firstName,
                    lastName:  req.body.data.attributes.lastName,
                    city: req.body.data.attributes.city,
                    state: req.body.data.attributes.state,
                    radius: req.body.data.attributes.radius
                };
                const profileId = mongodb.Types.ObjectId();
                
                User.create({
                    firstName: userData.firstName,
                    lastName:  userData.lastName,
                    city: userData.city,
                    state: userData.state,
                    radius: userData.radius,
                    profileId: profileId,
                    _id: req.params.accountId
                }).then((user, err) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    Profile.create({
                        _id: profileId,
                        isNull: true
                    }).then((profile, err) => {
                        if (err) {
                            res.status(500).send(err);
                        }
                        let included = [];
                        included.push({
                            type: "Profile",
                            id: profileId,
                            attributes: profile,
                            relationships: {
                                skills: {
                                    data: []
                                },
                                occupations: {
                                    data: []
                                },
                                education: {
                                    data: []
                                },
                                experience: {
                                    data: []
                                }                      
                            }
                        });
                        res.json({
                            data: {
                                id: user._id,
                                type: "User",
                                attributes: user,
                                relationships: {
                                    profile: {
                                        data: {
                                            id: profileId,
                                            type: "Profile"
                                        }
                                    }
                                }
                            },
                            included: included
                        });
                    });

                });
            } else {
                res.status(400).send("Bad request, body needs to include body.data.attributes\nYou sent: " + JSON.stringify(req.body));
            }
        };
    }
}

blueprint.controller(UserController);

module.exports = exports = UserController;
