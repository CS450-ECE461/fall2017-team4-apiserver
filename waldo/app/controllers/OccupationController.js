const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const Occupation = require('../models/Occupation');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;


class OccupationController {
    constructor() {
        blueprint.BaseController.call(this);
    }

    add() {
        return (req, res) => {
            const newOccupation = req.body.data.attributes;
            Occupation.create({
                name: newOccupation.name,
                profileId: req.params.profileId,
                _id: new ObjectId()
            }, (err, Occupation) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: {
                            id: Occupation._id,
                            type: 'Occupation',
                        },
                        attributes: occupation
                    });
                }
            });
        };
    }

    getOne() {
        return (req, res) => {
            Occupation.findOne({ _id: req.params.OccupationId }, {}, (err, occupation) => {
                if (err) {
                    res.status(500).send(err);
                } else if (occupation == null) {
                    res.status(404).send("Occupation not Found");
                } else {
                    res.json({
                        data: {
                            id: occupation._id,
                            type: 'Occupation',
                        },
                        attributes: occupation
                    });
                }
            });
        };
    }

    delete() {
        return (req, res) => {
            Occupation.remove({ _id: req.parans.OccupationId }, (err) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: {
                            id: 1,
                            type: 'Message',
                            attributes: {
                                id: 1,
                                message: "Occupation Document was deleted. {_id: " + req.params.OccupationId + "}"
                            }
                        }
                    });
                }
            });
        };
    }

    update() {
        return (req, res) => {
            const requestOccupation = req.body.data.attributes;
            Occupation.findOne({ _id: req.params.OccupationId }, {}, (err, occupation) => {
                if (err) {
                    res.status(500).send(err);
                } else if (occupation == null) {
                    res.status(404).send("Occupation not Found");
                } else {
                    let updatedOccupation = {
                        name: requestOccupation.name || Occupation.name,
                    };
                    Occupation.findOneAndUpdate({ _id: occupation._id }, updatedOccupation, {}, (err, callbackOccupation) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            res.json({
                                data: {
                                    id: callbackOccupation._id,
                                    type: 'Occupation',
                                },
                                attributes: callbackOccupation
                            });
                        }
                    });
                }
            });
        };
    }

    getByProfile() {
        return (req, res) => {
            Occupation.find({ profileId: req.params.profileId }, {}, (err, Occupation) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json({
                        data: Occupation.map((i) => {
                            return {
                                id: i._id,
                                type: 'Occupation',
                                attributes: i
                            };
                        }),
                    });
                }
            });
        };
    }
}

blueprint.controller(OccupationController);

module.exports = exports = OccupationController;