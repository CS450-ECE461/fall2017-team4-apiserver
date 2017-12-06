const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
const async = require('async');
const got = require('got');
const ObjectId = require('@onehilltech/blueprint-mongodb').Types.ObjectId;

const Company = require('../models/Company');
const Employee = require('../models/Employee');
const EmployeeJobAssociation = require('../models/EmployeeJobAssociation');

const Job = require('../models/Job');
const JobSkillAssociation = require('../models/JobSkillAssociation');
const SavedJob = require('../models/SavedJob');

const User = require('../models');
const Profile = require('../models/Profile');
const ProfileSkillAssociation = require('../models/ProfileSkillAssociation');

const Skill = require('../models/Skill');
const Occupation = require('../models/Occupation');

class JobController {

    constructor() {
        blueprint.BaseController.call(this);
    }

    getSavedJobs() {
        return (req, res) => {
            SavedJob.find({ userId: req.params.userId }, {}, (err, savedJobs) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /users/:userId/jobs/saved' },
                            title: "Unable to get SavedJobs",
                            detail: err
                        }]
                    });
                } else if (savedJobs == null /*|| savedJobs.length == 0*/ ) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /users/:userId/jobs/saved' },
                            title: "Unable to Find any SavedJobs with that userId\nuserId: " + req.params.userId,
                            detail: "No SavedJobs found with that userId"
                        }]
                    });
                } else {
                    let jobIds = savedJobs.map((savedjob) => {
                        return savedJob.jobId;
                    });
                    Job.find({ _id: { $in: jobIds } }, {}, (err, jobs) => {
                        if (err) {
                            res.status(500).json({
                                errors: [{
                                    status: 500,
                                    source: { pointer: 'GET /users/:userId/jobs/saved' },
                                    title: "Unable to get Jobs",
                                    detail: err
                                }]
                            });
                        } else if (jobs == null /*|| jobs.length == 0*/ ) {
                            res.status(404).json({
                                errors: [{
                                    status: 404,
                                    source: { pointer: 'GET /users/:userId/jobs/saved' },
                                    title: "Unable to Find any Jobs with that userId\nuserId: " + req.params.userId,
                                    detail: "No Jobs found with that userId"
                                }]
                            });
                        } else {
                            res.json({
                                data: jobs.map((job) => {
                                    return {
                                        id: job._id,
                                        type: "Job",
                                        attributes: job
                                    };
                                })
                            });
                        }
                    });
                }
            });
        };
    }

    getOpenJobsByUser() {
        return (req, res) => {
            User.findById(req.params.userId, {}, (err, user) => {
                if (err) {

                } else if (user == null) {

                } else {
                    let userLocation = user.location;
                    let radius = user.radius;
                    ProfileSkillAssociation.find({ profileId: user.profileId }, {}, (err, profileSkillAssociations) => {
                        if (err) {
                            res.status(500).json({
                                errors: [{
                                    status: 500,
                                    source: { pointer: 'GET /users/:userId/jobs/open' },
                                    title: "Unable to get Jobs",
                                    detail: err
                                }]
                            });

                        } else if (profileSkillAssociations == null) {
                            res.status(404).json({
                                errors: [{
                                    status: 404,
                                    source: { pointer: 'GET /users/:userId/jobs/open' },
                                    title: "Unable to Find any Jobs with that userId\nuserId: " + req.params.userId,
                                    detail: "No Jobs found with that userId"
                                }]
                            });

                        } else {
                            let userSkillIds = profileSkillAssociations.map((profileSkillAssociation) => {
                                return profileSkillAssociation.skillId;
                            });
                            Job.find({}, {}, (err, jobs) => {
                                if (err) {
                                    res.status(500).json({
                                        errors: [{
                                            status: 500,
                                            source: { pointer: 'GET /users/:userId/jobs/open' },
                                            title: "Unable to get Jobs",
                                            detail: err
                                        }]
                                    });

                                } else if (jobs == null) {
                                    res.status(404).json({
                                        errors: [{
                                            status: 404,
                                            source: { pointer: 'GET /users/:userId/jobs/open' },
                                            title: "Unable to Find any Jobs with that userId\nuserId: " + req.params.userId,
                                            detail: "No Jobs found with that userId"
                                        }]
                                    });

                                } else {
                                    let jobIds = jobs.map((job) => {
                                        return job._id;
                                    });
                                    JobSkillAssociation.find({ jobId: { $in: jobIds } }, {}, (err, jobSkillAssociations) => {
                                        if (err) {
                                            res.status(500).json({
                                                errors: [{
                                                    status: 500,
                                                    source: { pointer: 'GET /users/:userId/jobs/open' },
                                                    title: "Unable to get Jobs",
                                                    detail: err
                                                }]
                                            });

                                        } else if (jobSkillAssociations == null) {
                                            res.status(404).json({
                                                errors: [{
                                                    status: 404,
                                                    source: { pointer: 'GET /users/:userId/jobs/open' },
                                                    title: "Unable to Find any Jobs with that userId\nuserId: " + req.params.userId,
                                                    detail: "No Jobs found with that userId"
                                                }]
                                            });

                                        } else {
                                            let skillIdsByJob = {};
                                            jobSkillAssociations.map((jobSkillAssociation) => {
                                                if (skillIdsByJob[jobSkillAssociation.jobId]) {
                                                    skillIdsByJob[jobSkillAssociation.jobId].push(jobSkillAssociation.skillId);
                                                } else {
                                                    skillIdsByJob[jobSkillAssociation.jobId] = [jobSkillAssociation.skillId];
                                                }
                                            });
                                            let filteredJobs = jobs.filter((job) => {
                                                return skillIdsByJob[job._id].some((skillId) => {
                                                    return userSkillIds.includes(skillId);
                                                });
                                            });
                                            let finalJobs = [];
                                            got.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + userLocation + "&key=" + "").then((userResponse) => {
                                                userLongLat = userResponse.results[0].geometry.location;
                                                async.each(filteredJobs, (filtered) => {
                                                    got.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + filtered.location + "&key=" + "").then((response) => {
                                                        let jobLongLat = response.results[0].geometry.location;
                                                        let distance = Math.sqrt(Math.pow((userLongLat.lng - jobLongLat.lng), 2) + Math.pow((userLongLat.lat - jobLongLat.lat), 2));
                                                        if (distance < radius) {
                                                            finalJobs.push(filtered);
                                                        }
                                                    });
                                                }, (err) => {
                                                    if (err) {
                                                        res.status(500).json({
                                                            errors: [{
                                                                status: 500,
                                                                source: { pointer: 'GET /users/:userId/jobs/open' },
                                                                title: "Unable to get Jobs",
                                                                detail: err
                                                            }]
                                                        });

                                                    } else {
                                                        let companyIds = finalJobs.map((job) => {
                                                            return job.companyId;
                                                        });
                                                        let occupationIds = finalJobs.map((job) => {
                                                            return job.occupationId;
                                                        });
                                                        Occupation.find({ _id: { $in: occupationIds } }, {}, (err, occupations) => {
                                                            if (err) {

                                                            } else if (occupations == null) {
                                                                res.status(404).json({
                                                                    errors: [{
                                                                        status: 404,
                                                                        source: { pointer: 'GET /users/:userId/jobs/open' },
                                                                        title: "Unable to Find any Jobs with that userId\nuserId: " + req.params.userId,
                                                                        detail: "No Jobs found with that userId"
                                                                    }]
                                                                });

                                                            } else {
                                                                Company.find({ _id: { $in: occupationIds } }, {}, (err, companies) => {
                                                                    if (err) {
                                                                        res.status(500).json({
                                                                            errors: [{
                                                                                status: 500,
                                                                                source: { pointer: 'GET /users/:userId/jobs/open' },
                                                                                title: "Unable to get Jobs",
                                                                                detail: err
                                                                            }]
                                                                        });

                                                                    } else if (companies == null) {
                                                                        res.status(404).json({
                                                                            errors: [{
                                                                                status: 404,
                                                                                source: { pointer: 'GET /users/:userId/jobs/open' },
                                                                                title: "Unable to Find any Jobs with that userId\nuserId: " + req.params.userId,
                                                                                detail: "No Jobs found with that userId"
                                                                            }]
                                                                        });

                                                                    } else {

                                                                        res.json({
                                                                            data: finalJobs.map((job) => {
                                                                                return {
                                                                                    id: job._id,
                                                                                    type: "Job",
                                                                                    attributes: job,
                                                                                    relationships: {
                                                                                        company: {
                                                                                            data: {
                                                                                                id: job.companyId,
                                                                                                type: "Company"
                                                                                            }
                                                                                        },
                                                                                        occupation: {
                                                                                            data: {
                                                                                                id: job.occupationId,
                                                                                                type: "Occupation"
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                };
                                                                            }),
                                                                            included: occupations.concat(companies)
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        };
    }

    getJobById() {
        return (req, res) => {

        };
    }

    getJobsByLocation() {
        return (req, res) => {

        };
    }
}

blueprint.controller(JobController);

module.exports = exports = JobController;