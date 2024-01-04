const { dashboardService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");







// const projectAllcount = catchAsync(async (req, res) => {
//   const filter = {};

//   const projectmasterCounts = await dashboardService.countprojectmaster(filter);

//   const ActivityCounts = await dashboardService.countProjectActivities(filter);

//   const projectcodecount = await dashboardService.countcode(filter);
//   const projectcompnaycount= await dashboardService.countcompnay(filter)


//   const options = pick(req.query, ['sortBy', 'limit', 'page']);
//   options.sortBy = options.sortBy || 'createdAt:desc';
//   ;

//   res.send({ projectmasterCounts, ActivityCounts, projectcodecount, projectcompnaycount });
// });



const projectAllcount = catchAsync(async (req, res) => {
  const filter = {};

   const projectmasterCounts = await dashboardService.countprojectmaster(filter);
   const ActivityCounts = await dashboardService.countProjectActivities(filter);
   const projectcodecount = await dashboardService.countcode(filter);
   const projectcompnaycount= await dashboardService.countcompnay(filter);

  //
     const projectconscount=await dashboardService.projectrequirementcount(filter);
     const manpowercount=await dashboardService.manpowercount(filter);
     const machinerycount=await dashboardService.machinerycount(filter);
     const SaftyToolscount=await dashboardService.SaftyToolscount(filter);
     const instrumentcount=await dashboardService.instrumentcount(filter);
     const toolsandtacklescount=await dashboardService.toolsandtacklescount(filter);
     


  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'createdAt:desc';

  res.send({ 
   projectMasterCounts: projectmasterCounts.count.toString(),
    projectActivityCounts: ActivityCounts.count.toString(),
    projectCodeCount: projectcodecount.count.toString(),
    projectCompnayCount: projectcompnaycount.count.toString(),

    projectrequirementCounts: [
      {
        consumables: projectconscount.count.toString(),
        manpowers:manpowercount.count.toString(),
        machinery:machinerycount.count.toString(),
        SaftyTools:SaftyToolscount.count.toString(),
        instrument:instrumentcount.count.toString(),
        toolsandtackles:toolsandtacklescount.count.toString()
      }
    ]
  });
});




module.exports = { projectAllcount }