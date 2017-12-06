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

const User = require('../models/User');
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
                                            got.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + userLocation + "&key=" + process.env.GOOGLE_KEY).then((userResponse) => {
                                                let userLongLat = userResponse.results[0].geometry.location;
                                                async.each(filteredJobs, (filtered) => {
                                                    got.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + filtered.location + "&key=" + process.env.GOOGLE_KEY).then((response) => {
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
            Job.findById(req.params.jobId, {}, (err, job) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /jobs/:jobId' },
                            title: "Unable to get Job",
                            detail: err
                        }]
                    });

                } else if (job == null) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /jobs/:jobId' },
                            title: "Unable to Find any Job with that jobId\njobId: " + req.params.jobId,
                            detail: "No Jobs found with that jobId"
                        }]
                    });

                } else {
                    JobSkillAssociation.find({ jobId: job._id }, {}, (err, jobSkillAssociations) => {
                        if (err) {
                            res.status(500).json({
                                errors: [{
                                    status: 500,
                                    source: { pointer: 'GET /jobs/:jobId' },
                                    title: "Unable to get JobSkillAssoc",
                                    detail: err
                                }]
                            });

                        } else if (jobSkillAssociations == null) {
                            res.status(404).json({
                                errors: [{
                                    status: 404,
                                    source: { pointer: 'GET /jobs/:jobId' },
                                    title: "Unable to Find any JobSkillAssocs with that jobId\njobId: " + req.params.jobId,
                                    detail: "No Jobs found with that jobId"
                                }]
                            });

                        } else {
                            let skillIds = jobSkillAssociations.map((jobSkillAssociation) => {
                                return jobSkillAssociation.skillId;
                            });
                            Skill.find({ _id: { $in: skillIds } }, {}, (err, skills) => {
                                if (err) {
                                    res.status(500).json({
                                        errors: [{
                                            status: 500,
                                            source: { pointer: 'GET /jobs/:jobId' },
                                            title: "Unable to get Skills",
                                            detail: err
                                        }]
                                    });

                                } else if (skills == null) {
                                    res.status(404).json({
                                        errors: [{
                                            status: 404,
                                            source: { pointer: 'GET /jobs/:jobId' },
                                            title: "Unable to Find any Skills with that jobId\njobId: " + req.params.jobId,
                                            detail: "No Skills found with that jobId"
                                        }]
                                    });

                                } else {
                                    Occupation.findById(job.occupationId, {}, (err, occupation) => {
                                        if (err) {
                                            res.status(500).json({
                                                errors: [{
                                                    status: 500,
                                                    source: { pointer: 'GET /jobs/:jobId' },
                                                    title: "Unable to get Occupation",
                                                    detail: err
                                                }]
                                            });

                                        } else if (occupation == null) {
                                            res.status(404).json({
                                                errors: [{
                                                    status: 404,
                                                    source: { pointer: 'GET /jobs/:jobId' },
                                                    title: "Unable to Find any Occupation with that jobId\njobId: " + req.params.jobId,
                                                    detail: "No Occupation found with that jobId"
                                                }]
                                            });

                                        } else {
                                            EmployeeJobAssociation.find({ jobId: job._id }, {}, (err, employeeJobAssociations) => {
                                                if (err) {
                                                    res.status(500).json({
                                                        errors: [{
                                                            status: 500,
                                                            source: { pointer: 'GET /jobs/:jobId' },
                                                            title: "Unable to get EmployJobAssoc",
                                                            detail: err
                                                        }]
                                                    });

                                                } else if (employeeJobAssociations == null) {
                                                    res.status(404).json({
                                                        errors: [{
                                                            status: 404,
                                                            source: { pointer: 'GET /jobs/:jobId' },
                                                            title: "Unable to Find any EmployeeJobAssocs with that jobId\njobId: " + req.params.jobId,
                                                            detail: "No EmployeeJobAssocs found with that jobId"
                                                        }]
                                                    });

                                                } else {
                                                    let employeeIds = employeeJobAssociations.map((employeeJobAssociation) => {
                                                        return employeeJobAssociation.employeeId;
                                                    });
                                                    Employee.find({ _id: { $in: employeeIds } }, {}, (err, employees) => {
                                                        if (err) {
                                                            res.status(500).json({
                                                                errors: [{
                                                                    status: 500,
                                                                    source: { pointer: 'GET /jobs/:jobId' },
                                                                    title: "Unable to get Jobs",
                                                                    detail: err
                                                                }]
                                                            });

                                                        } else if (employees == null) {
                                                            res.status(404).json({
                                                                errors: [{
                                                                    status: 404,
                                                                    source: { pointer: 'GET /jobs/:jobId' },
                                                                    title: "Unable to Find any Employees with that jobId\njobId: " + req.params.jobId,
                                                                    detail: "No Employees found with that jobId"
                                                                }]
                                                            });

                                                        } else {
                                                            Company.findById(job.companyId, {}, (err, company) => {
                                                                if (err) {
                                                                    res.status(500).json({
                                                                        errors: [{
                                                                            status: 500,
                                                                            source: { pointer: 'GET /jobs/:jobId' },
                                                                            title: "Unable to get Jobs",
                                                                            detail: err
                                                                        }]
                                                                    });

                                                                } else if (company == null) {
                                                                    res.status(404).json({
                                                                        errors: [{
                                                                            status: 404,
                                                                            source: { pointer: 'GET /jobs/:jobId' },
                                                                            title: "Unable to Find any Company with that jobId\njobId: " + req.params.jobId,
                                                                            detail: "No Company found with that jobId"
                                                                        }]
                                                                    });

                                                                } else {
                                                                    res.json({
                                                                        data: {
                                                                            id: job._id,
                                                                            type: "Job",
                                                                            attributes: job,
                                                                            relationships: {
                                                                                company: {
                                                                                    data: {
                                                                                        id: company._id,
                                                                                        type: "Company"
                                                                                    }
                                                                                },
                                                                                employees: employees.map((employee) => {
                                                                                    return {
                                                                                        id: employee._id,
                                                                                        type: "Employee"
                                                                                    };
                                                                                }),
                                                                                occupation: {
                                                                                    data: {
                                                                                        id: occupation._id,
                                                                                        type: "Occupation"
                                                                                    }
                                                                                },
                                                                                skills: skills.map((skill) => {
                                                                                    return {
                                                                                        data: {
                                                                                            id: skill._id,
                                                                                            type: "Skill"
                                                                                        }
                                                                                    };
                                                                                })
                                                                            }
                                                                        }, //end data
                                                                        included: skills.concat(employees).concat(skills).concat(occupation).concat(company)
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    });
                                                }
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

    getJobs() {
        return (req, res) => {
            Job.find({}, {}, (err, jobs) => {
                if (err) {
                    res.status(500).json({
                        errors: [{
                            status: 500,
                            source: { pointer: 'GET /jobs' },
                            title: "Unable to get Jobs",
                            detail: err
                        }]
                    });

                } else if (jobs == null) {
                    res.status(404).json({
                        errors: [{
                            status: 404,
                            source: { pointer: 'GET /jobs' },
                            title: "Unable to Find any Jobs",
                            detail: "No Jobs found"
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
        };
    }
}

blueprint.controller(JobController);

module.exports = exports = JobController;