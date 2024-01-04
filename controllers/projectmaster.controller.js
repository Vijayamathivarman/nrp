const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError=require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { projectMasterService } = require('../services');

//CREATE
// const createProjectMaster = catchAsync(async (req, res) => {
//     const master = await projectMasterService.createProjectMaster(req.body);
//     res.status(httpStatus.OK).send(master);
//     // res.status(httpStatus.OK).send('Project master created successfully');
// });

const createProjectMaster = catchAsync(async (req, res) => {
  try {
      const master = await projectMasterService.createProjectMaster(req.body);
      res.status(httpStatus.OK).send(master);
  } catch (error) {
      if (error.name === 'ValidationError') {
          // Format validation error response without stack trace
          const validationErrors = Object.values(error.errors).map((err) => err.message);
          res.status(httpStatus.BAD_REQUEST).json({ code: httpStatus.BAD_REQUEST, message: validationErrors });
      } else {
          // Handle other types of errors
          console.error(error);
          res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
      }
  }
});


// VIEW
const getProjectMasters = catchAsync(async(req, res) => {
    const {projectMaster,projectMasterActivity}=req.query;
   const filter={};
   if(projectMaster)filter.projectMaster= projectMaster;
      if(projectMasterActivity)filter.projectMasterActivity=projectMasterActivity
    const option = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await projectMasterService.queryprojectMaster(filter, option);
    res.send(result);
})

const getAllProjectMasters = catchAsync(async(req, res) => {
    const filter = pick(req.query, ['projectMaster']);
    const option = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await projectMasterService.queryprojectMasterAll(filter, option);
    res.send(result);
})


//SHOW
const getProjectMaster = catchAsync(async (req, res) => {
    const master = await projectMasterService.getprojectMasterById(req.params.masterId);
    if(!master) {
        throw new ApiError(httpStatus.NOT_FOUND, 'master id not found');
    }
    res.send(master);
});

//UPDATE

const updateprojectMaster = catchAsync(async (req, res) => {
    const master = await projectMasterService.updateProjectMasterById(req.params.masterId, req.body);
  
    if (!master) {
      return res.status(httpStatus.NOT_FOUND).json({ message: 'id not found' });
    }
    const response = {
      message: master,
  
    };
  
    res.send(response);
  });
  


//DELETE

const  deleteprojectMaster = catchAsync(async (req, res) => {
    const result = await projectMasterService.deleteprojectMasterById(req.params.masterId);

    if (!result) {
      res.status(httpStatus.NOT_FOUND).json({ message: ' Project master not found' });
    } else {
        res.status(httpStatus.OK).send('Project master deleted successfully');
    }
});


const getProjectMasterswithoutpgn = catchAsync(async(req, res) => {
  const {projectMaster,projectMasterActivity}=req.query;
  const filter={};
  if(projectMaster)filter.projectMaster= projectMaster;
     if(projectMasterActivity)filter.projectMasterActivity=projectMasterActivity
   
   const result = await projectMasterService.getProjectMasterswithoutpgn(filter);

  
   res.send(result);
})


module.exports = {
    createProjectMaster,
    getProjectMasters,
    getAllProjectMasters,
    getProjectMaster,
    updateprojectMaster,
    deleteprojectMaster,
    getProjectMasterswithoutpgn
}
