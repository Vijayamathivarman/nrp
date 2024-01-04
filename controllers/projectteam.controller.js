const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { projectTeamService } = require('../services');
const pick = require("../utils/pick");



// CREATE PROJECT TEAM
const createProjectTeam = catchAsync(async (req, res) => {
  const createcode = await projectTeamService.CreateProjectTeam(req.body);
  res.status(httpStatus.OK).send(createcode);
});
// const createProjectTeam = catchAsync(async (req, res) => {
//   try {
//       const createcode = await projectTeamService.CreateProjectTeam(req.body);
//       res.status(httpStatus.OK).send(createcode);
//   } catch (error) {
//       // Check if the error is a Mongoose validation error
//       if (error.name === 'ValidationError') {
//           // Extract the first validation error message for the 'projectCode' field
//           const projectCodeError = error.errors['projectCode']?.message || 'Unknown validation error';
//           const customResponse = {
//               code: 400,
//               message: projectCodeError,
//           };
//           res.status(400).send(customResponse);
//       } else {
//           // If it's not a validation error, handle it as a general error
//           console.error(error);
//           res.status(500).send('Internal Server Error');
//       }
//   }
// });


//view
const getallProjectTeam = catchAsync(async (req, res) => {
  const { projectCode, projectCompany, name, employeeCode, category } = req.query;
  const filter = {};
  if (projectCode) filter.projectCode = projectCode;
  if (projectCompany) filter.projectCompany = projectCompany;
  if (name) filter.name = name;
  if (employeeCode) filter.employeeCode = employeeCode;
  if (category) filter.category = category;
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const getall = await projectTeamService.queryProjectTeam(filter, option);
  res.send(getall);
});

//show id
const getProjectTeam = catchAsync(async (req, res) => {
  const master = await projectTeamService.getprojectTeamById(req.params.masterId);
  if (!master) {
    throw new ApiError(httpStatus.NOT_FOUND, 'master not found');
  }
  res.send(master);
});

//UPADTE
const updateprojectTeam = catchAsync(async (req, res) => {
  const master = await projectTeamService.updateProjectTeamById(req.params.masterId, req.body);

  if (!master) {
    return res.status(httpStatus.NOT_FOUND).json({ message: 'id  not found' });
  }
  res.send(master);
});
///delete
const deleteprojectTeam = catchAsync(async (req, res) => {
  const result = await projectTeamService.deleteprojectTeamById(req.params.masterId);

  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({ message: ' Project master not found' });
  } else {
    res.status(httpStatus.OK).send('Project master deleted successfully');
  }
});

module.exports = { createProjectTeam, getallProjectTeam, getProjectTeam, updateprojectTeam, deleteprojectTeam };