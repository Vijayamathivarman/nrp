const { filter } = require("../config/logger");
const { projectrequirementService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");





const projectrequirement=catchAsync(async(req,res)=>{
const filter={};
const { projectCode, projectActivity, projectMaster} = req.query;
if (projectCode) filter.projectCode = projectCode;
if (projectActivity) filter.projectActivity = projectActivity;
if (projectMaster) filter.projectMaster = projectMaster;
   const consumablescount= await projectrequirementService.countProjectActivities(filter);

   const options = pick(req.query, ['sortBy', 'limit', 'page']);
   options.sortBy = options.sortBy || 'createdAt:desc';
   ;
   res.send(consumablescount)

});





module.exports={projectrequirement}