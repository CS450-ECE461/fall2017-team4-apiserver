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

        }
    }

    getAllSkills() {
        return (req, res) => {
            
        }
    }

    addNewSkillToProfile() {
        return (req, res) => {
            
        }
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