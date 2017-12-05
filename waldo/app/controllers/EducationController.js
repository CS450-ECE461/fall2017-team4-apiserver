const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const Education = require('../models/Education');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

/**
 * This class handles the requests for Education data.
 */
class EducationController {
    /**
     * Allows Controller to hook into bluepint.
     */
    constructor() {
        blueprint.BaseController.call(this);
    }

    /**
     * Handles adding a new Education to the DB.
     * This requires a profileId to proint back to.
     */
    add() {
        return (req, res) => {
            const newEducation = req.body.data.attributes;
            Education.create({
                title: newEducation.title,
                schoolName: newEducation.schoolName,
                city: newEducation.city,
                state: newEducation.state,
                startDate: newEducation.startDate,
                endDate: newEducation.endDate,
                about: newEducation.about,
                profileId: req.params.profileId,
                _id: new ObjectId()
            }, (err, education) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: {
                            id: education._id,
                            type: 'Education'
                        },
                        attributes: education
                    });
                }
            });
        };
    }

    /**
     * Handles getting a single Education document, by educationId.
     */
    getOne() {
        return (req, res) => {
            Education.findOne({ _id: req.params.educationId }, {}, (err, education) => {
                if (err) {
                    res.status(500).send(err);
                } else if (education == null) {
                    res.status(404).send("Education not Found");
                } else {
                    res.json({
                        data: {
                            id: education._id,
                            type: 'Education'
                        },
                        attributes: education
                    });
                }
            })
        };
    }

    /**
     * Removes a single Education document, by educationId.
     */
    delete() {
        return (req, res) => {
            Education.remove({ _id: req.params.educationId }, (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: {
                            id: 1,
                            type: 'Message'
                        },
                        attributes: {
                            id: 1,
                            message: "Education Document was deleted. {_id: " + req.params.educationId + "}"
                        }
                    });
                }
            });
        };
    }

    /**
     * Updates an education Document.
     * This will only change the fields that are sent, any null fields in the PUT body, will not change the document.
     */
    update() {
        return (req, res) => {
            const requestEducation = req.body.data.attributes;
            Education.findOne({ _id: req.params.educationId }, {}, (err, education) => {
                if (err) {
                    res.status(500).send(err);
                } else if (education == null) {
                    res.status(404).send("Education not Found");
                } else {
                    let updatedEducation = {
                        icon: requestEducation.icon || education.icon,
                        title: requestEducation.title || education.title,
                        schoolName: requestEducation.schoolName || education.schoolName,
                        city: requestEducation.city || education.city,
                        state: requestEducation.state || education.state,
                        startDate: requestEducation.startDate || education.startDate,
                        endDate: requestEducation.endDate || education.endDate,
                        about: requestEducation.about || education.about
                    };
                    Education.findOneAndUpdate({ _id: education._id }, updatedEducation, {}, (err, callbackEducation) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json({
                                data: {
                                    id: callbackEducation._id,
                                    type: 'Education'
                                },
                                attributes: callbackEducation
                            });
                        }
                    });
                }
            });
        };
    }

    /**
     * This will find and return all of the education documents with a matching profileId.
     */
    getByProfile() {
        return (req, res) => {
            Education.find({ profileId: req.params.profileId }, {}, (err, education) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: education.map((i) => {
                            return {
                                id: i._id,
                                type: 'Education',
                                attributes: i
                            };
                        })
                    });
                }
            });
        };
    }
}

//Registers this Controller with Blueprint.
blueprint.controller(EducationController);

module.exports = exports = EducationController;