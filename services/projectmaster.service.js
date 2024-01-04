const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../../src/config/config');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const asyncHandler = require('express-async-handler');
const ProjectMaster = require('../models/projectmaster.model');
const { filter } = require('../config/logger');


/**
 * Create a projectMaster
 * @param {Object} projectmasterBody
 * @returns {Promise<ProjectMaster>}
 */


const createProjectMaster = async(projectmasterBody) => {
    projectmasterBody.createAt = new Date();
    projectmasterBody.updateAt = new Date();
     return ProjectMaster.create(projectmasterBody);
}

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} option - Query options
 * @param {string} [option.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [option.limit] - Maximum number of results per page (default = 10)
 * @param {number} [option.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */


const queryprojectMaster = async(filter,option) => {
    const masters = await ProjectMaster.paginate(filter,option);
    return masters;
};

/**
 * Query for products
 * @param {Object} filter - Mongo filter
 * @param {Object} option - Query options
 * @param {string} [option.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [option.limit] - Maximum number of results per page (default = 10)
 * @param {number} [option.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */


// const queryprojectMasterAll = async (filter, option) => {
//     const allMasters = await ProjectMaster.paginate(filter, option);
    
//     const distinctProjectMasters = [];
//     allMasters.results.forEach((result) => {
//         if(!distinctProjectMasters.includes(result.projectMaster)) {
//             distinctProjectMasters.push(result.projectMaster);
//         }
//     });
//     return distinctProjectMasters;
//   };
const queryprojectMasterAll = async(filter, option) => {
    const codes = await ProjectMaster.paginate(filter, option);
    return codes;
}


/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<ProjectMaster>}
 */

const getprojectMasterById = async(id) => {
    return ProjectMaster.findById(id);
}


/**
 * Update product by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<ProjectMaster>}
 */

const updateProjectMasterById = async(id, updateBody) => {
    const master = await getprojectMasterById(id);
    Object.assign(master, updateBody);
    master.updateAt = new Date();
    await master.save();
    return master;
};
/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<ProjectMaster>}
 */

const deleteprojectMasterById = async(id) => {
    const master = await getprojectMasterById(id);
    if(!master){
        throw new ApiError(httpStatus.NOT_FOUND, 'Master not found');
    }
    await master.remove();
    return master;
};

//all without pagination
const getProjectMasterswithoutpgn = async(filter) => {
    const masters = await ProjectMaster.find(filter);
    return masters;
};
module.exports = {
    createProjectMaster,
    queryprojectMaster,
    queryprojectMasterAll,
    getprojectMasterById,
    updateProjectMasterById,
    deleteprojectMasterById,
    getProjectMasterswithoutpgn

}