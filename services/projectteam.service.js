const { filter } = require('../config/logger');
const projectTeam = require('../models/projectteam.model');
const catchAsync = require('../utils/catchAsync');
const asyncHandler = require('express-async-handler');

/**
 * Create a projectMaster
 * @param {Object} projectcodeBody
 * @returns {Promise<projectTeam>}
 */
//create  
const CreateProjectTeam = async (projectteamBody) => {
    // projectteamBody.createTime = new Date();
    return projectTeam.create(projectteamBody);
}
//view
const queryProjectTeam = async (filter, Option) => {
    const teams = await projectTeam.paginate(filter, Option);
    return teams;
}

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<ProjectMaster>}
 */
//show
const getprojectTeamById = async (id) => {
    return projectTeam.findById(id);
}


//UPADATE
const updateProjectTeamById = async (id, updateBody) => {
    const master = await getprojectTeamById(id);
    Object.assign(master, updateBody);
    master.updatedTime = new Date();
    await master.save();
    return master;
};
//delete
const deleteprojectTeamById = async (id) => {
    const master = await getprojectTeamById(id);
    if (!master) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    await master.remove();
    return master;
};

module.exports = {
    CreateProjectTeam,
    queryProjectTeam,
    getprojectTeamById,
    updateProjectTeamById,
    deleteprojectTeamById
};