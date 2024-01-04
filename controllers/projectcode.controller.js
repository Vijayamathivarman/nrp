const catchAsync = require('../utils/catchAsync');
const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError=require('../utils/ApiError');
const {projectCodeService}= require('../services');



//create
// const createProjectCode = catchAsync(async(req, res) => {
//     const code = await projectCodeService.createProjectCode(req.body);
//     res.status(httpStatus.OK).send(code);
// });
const createProjectCode = catchAsync(async (req, res) => {
    const { projectCode, projectCompany, periodStart, periodEnd, chainage, projectMaster, location } = req.body;

    // Check if all required fields are present
    if (!projectCode || !projectCompany || !periodStart || !periodEnd || !chainage || !projectMaster || !location) {
        return res.status(httpStatus.BAD_REQUEST).json({
            code: httpStatus.BAD_REQUEST,
            message: 'All of the following fields are required: projectCode, projectCompany, periodStart, periodEnd, chainage, projectMaster, location'
        });
    }

    // Proceed with creating the project code
    const code = await projectCodeService.createProjectCode(req.body);
    res.status(httpStatus.OK).send(code);
});


const getProjectCodes = catchAsync(async (req, res) => {
  const { projectCode, projectCompany, periodStart, periodEnd, chainage, projectMater, location } = req.query;
 
//   const { projectCode, projectCompany, periodStart, periodEnd, chainage, projectMater, location } = req.body;
  const filter = {};
  if (projectCode) filter.projectCode = projectCode;
  if (projectCompany) filter.projectCompany = projectCompany;
  if (periodStart) filter.periodStart = periodStart;
  if (periodEnd) filter.periodEnd = periodEnd;
  if (chainage) filter.chainage = chainage;
  if (projectMater) filter.projectMater = projectMater;
  if (location) filter.location = location;

  const option = pick(req.query, ['sortBy', 'limit', 'page']);

  const result = await projectCodeService.queryprojectCode(filter, option);
  res.send(result);
});


const getProjectCode = catchAsync(async(req, res) => {
    const code = await projectCodeService.getprojectCodeById(req.params.codeId);
    if(!code) {
        throw new ApiError(httpStatus.NOT_FOUND, 'code not found');
    }
    res.send(code);
})

const updateprojectCode = catchAsync(async(req, res) => {
    const code = await projectCodeService.updateprojectCodeById(req.params.codeId, req.body);
    res.send(code);
})

const deleteProjectCode = catchAsync(async (req, res) => {
    const result = await projectCodeService.deleteProjectCodeById(req.params.codeId);

    if (!result) {
        res.status(httpStatus.NOT_FOUND).json({ message: 'Project code not found' });
    } else {
        res.status(httpStatus.OK).json({ message: 'Project code deleted successfully' });
    }
});


const getProjectCodeswithoutpagination = catchAsync(async (req, res) => {
    const { projectCode, projectCompany, periodStart, periodEnd, chainage, projectMater, location } = req.query;
   
    const filter = {};
    if (projectCode) filter.projectCode = projectCode;
    if (projectCompany) filter.projectCompany = projectCompany;
    if (periodStart) filter.periodStart = periodStart;
    if (periodEnd) filter.periodEnd = periodEnd;
    if (chainage) filter.chainage = chainage;
    if (projectMater) filter.projectMater = projectMater;
    if (location) filter.location = location;
  
    // const option = pick(req.query, ['sortBy', 'limit', 'page']);
  
    const result = await projectCodeService.projectCodewithoutpagination(filter);
    res.send(result);
  });
module.exports = {
    createProjectCode,
    getProjectCodes,
    getProjectCode,
    updateprojectCode,
    deleteProjectCode,getProjectCodeswithoutpagination
}