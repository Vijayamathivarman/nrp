const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const config = require('../../src/config/config');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const asyncHandler = require('express-async-handler');
const ProjectCode= require('../models/projectcode.model');


/**
 * Create a projectMaster
 * @param {Object} projectcodeBody
 * @returns {Promise<ProjectCode>}
 */


// const createProjectCode = async(projectcodeBody) => {
//     projectcodeBody.createAt = new Date();

//     projectcodeBody.updateAt = new Date();
//     return ProjectCode.create(projectcodeBody);
// }


const createProjectCode = async (projectcodeBody) => {
    // Check if the project code already exists
    if (await ProjectCode.isprojectCodeTaken(projectcodeBody.projectCode)) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'projectCode already taken');
      }

    projectcodeBody.createAt = new Date();
    projectcodeBody.updateAt = new Date();

    return ProjectCode.create(projectcodeBody);
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

const queryprojectCode = async(filter, option) => {
    const codes = await ProjectCode.paginate(filter, option);
    return codes;
}

/**
 * Get product by id
 * @param {ObjectId} id
 * @returns {Promise<ProjectCode>}
 */

const getprojectCodeById = async(id) => {
    return ProjectCode.findById(id);
}

/**
 * Update product by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<ProjectCode>}
 */


const updateprojectCodeById = async (id, updateBody) => {
    const code = await getprojectCodeById(id);
    Object.assign(code, updateBody);
    code.updateAt = new Date();
    await code.save();
    return code;
};

/**
 * Delete product by id
 * @param {ObjectId} id
 * @returns {Promise<ProjectCode>}
 */

const deleteProjectCodeById = async(id) => {
    const code = await getprojectCodeById(id);
    if(!code){
        throw new ApiError(httpStatus.NOT_FOUND, 'code not found');
    }
    await code.remove();
    return code;
}



//
const projectCodewithoutpagination = async (filter) => {
    const codes = await ProjectCode.find(filter);
    return codes;
};

module.exports = {
    createProjectCode,
    queryprojectCode,
    getprojectCodeById,
    updateprojectCodeById,
    deleteProjectCodeById,
    projectCodewithoutpagination
}