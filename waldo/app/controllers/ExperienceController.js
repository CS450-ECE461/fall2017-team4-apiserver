const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const Experience = require('../models/Experience');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;


class ExperienceController {
    constructor() {
        blueprint.BaseController.call(this);
    }

    add() {
        return (req, res) => {
            const newExperience = req.body.data.attributes;
            Experience.create({
                title: newExperience.title,
                companyName: newExperience.companyName,
                city: newExperience.city,
                state: newExperience.state,
                startDate: newExperience.startDate,
                endDate: newExperience.endDate,
                about: newExperience.about,
                profileId: req.params.profileId,
                _id: new ObjectId()
            }, (err, experience) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: {
                            id: experience._id,
                            type: 'Experience',
                            attributes: experience
                        }
                    });
                }
            });
        };
    }

    getOne() {
        return (req, res) => {
            Experience.findOne({_id: req.params.experienceId}, {}, (err, experiece) => {
                if (err) {
                    res.status(500).send(err);
                } else if (experiece == null) {
                    res.status(404).send("Experience not Found");
                } else {
                    res.json({
                        data: {
                            id: experiece._id,
                            type: 'Experience',
                            attributes: experience
                        }
                    });
                }
            });
        };
    }

    delete() {
        return (req, res) => {
            Experience.remove({_id: req.parans.experienceId}, (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: {
                            id: 1,
                            type: 'Message',
                            attributes: {
                                message: "Experience Document was deleted. {_id: " + req.params.experienceId + "}"
                            }
                        }
                    });
                }
            });
        };
    }

    update() {
        return (req, res) => {
            const requestExperience = req.body.data.attributes;
            Experience.findOne({_id: req.params.experienceId}, {}, (err, experiece) => {
                if (err) {
                    res.status(500).send(err);
                } else if (experiece == null) {
                    res.status(404).send("Experience not Found");
                } else {
                    let updatedExperience = {
                        icon: requestExperience.icon || experience.icon,
                        title: requestExperience.title || experience.title,
                        companyName: requestExperience.companyName || experiece.companyName,
                        city: requestExperience.city || experience.city,
                        state: requestExperience.state || experiece.state,
                        startDate: requestExperience.startDate || experiece.startDate,
                        endDate: requestExperience.endDate || experiece.endDate,
                        about: requestExperience.about || experiece.about
                    };
                    Experience.findOneAndUpdate({_id: experiece._id}, updatedExperience, {}, (err, callbackExperience) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json({
                                id: callbackExperience._id,
                                type: 'Experience',
                                attributes: callbackExperience
                            });
                        }
                    });
                }
            });
        };
    }

    getByProfile() {
        return (req, res) => {
            Experience.find({profileId: req.params.profileId}, {}, (err, experience) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data : experience.map((i) => {
                            return {
                                id: i._id,
                                type: 'Experience',
                                attributes: i
                            };
                        })
                    });
                }
            });
        };
    }
}

blueprint.controller(ExperienceController);

module.exports = exports = ExperienceController;