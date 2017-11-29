const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

const Skill = require('../models/Skill');
const Profile = require('../models/Profile');
const ProfileSkillAssociation = require('../models/ProfileSkillAssociation');

class SkillController {
    constructor() {
        blueprint.BaseController.call(this);
    }

    add() {
        return (req, res) => {
            Skill.create({
               name: req.body.attributes.name,
               _id: new ObjectId() 
            }, (err, skill) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: {pointer : 'POST /skills'},
                            title: "Unable to Create Skill",
                            detail: err
                        }]
                    });
                } else {
                    res.json({
                        data: {
                            id: skill._id,
                            type: "Skill"
                        },
                        attributes: skill
                    });
                }
            });
        };
    }

    getAllSkills() {
        return (req, res) => {
            Skill.find({}, {}, (err, skills) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: {pointer : 'GET /skills'},
                            title: "Unable to Get Skills",
                            detail: err
                        }]
                    });
                } else if (skills == null || skills.length == 0) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: {pointer : 'GET /skills'},
                            title: "Unable to Find any Skills",
                            detail: "No skills were found"
                        }]
                    });
                } else {
                    res.json({
                        data: skills.map((skill) => {
                            return {
                                id: skill._id,
                                type: "Skill"
                            };
                        }),
                        attributes: skills
                    });
                }
            });
        };
    }

    addNewSkillToProfile() {
        return (req, res) => {
            ProfileSkillAssociation.create({
                profileId: req.params.profileId,
                skillId: req.params.skillId,
                _id: new ObjectId()
            }, (err, profileSkillAssociation) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: {pointer : 'POST /profiles/:profileId/skills/:skillId'},
                            title: "Unable to Create Skill Profile Association",
                            detail: err
                        }]
                    });
                } else {
                    Skill.find({_id: profileSkillAssociation.skillId}, {}, (err, skill) => {
                        if (err) {
                            res.status(500).json({
                                errors: [{
                                    status: 500,
                                    source: {pointer : 'POST /profiles/:profileId/skills/:skillId'},
                                    title: "Unable to Find Skill",
                                    detail: err
                                }]
                            });
                        } else if (skill == null) {
                            res.status(404).json({
                                errors: [{
                                    status: 404,
                                    source: {pointer : 'POST /profiles/:profileId/skills/:skillId'},
                                    title: "No skill with that Id was found\nskillId: " + profileSkillAssociation.skillId,
                                    detail: err
                                }]
                            });
                        } else {
                            res.json({
                                data: {
                                    id: profileSkillAssociation._id,
                                    type: "ProfileSkillAssociation"
                                },
                                attributes: profileSkillAssociation,
                                relationships: {
                                    skill: {
                                        data: {
                                            id: profileSkillAssociation.skillId,
                                            type: "Skill"
                                        }
                                    }
                                },
                                included: [
                                    skill
                                ]
                            });
                        }
                    });
                }
            });
        };
    }

    removeSkillFromProfile() {
        return (req, res) => {
            
        }
    }

    getByProfile() {
        return (req, res) => {
            
        }
    }
}

blueprint.controller(SkillController);

module.exports = exports = SkillController;