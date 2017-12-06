const blueprint = require('@onehilltech/blueprint');
const mongodb = require('@onehilltech/blueprint-mongodb');
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
                    Profile.findById(user.profileId, {}, (err, profile) => {
                        if (err) {

                        } else if (profile == null) {

                        } else {

                        }
                    })
                }
            })
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