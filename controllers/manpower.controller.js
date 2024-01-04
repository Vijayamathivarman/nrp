const httpStatus = require("http-status");
const { manpowerServic } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");

//create
const CreatManpower= catchAsync(async(req, res) => {
    const machinaery = await manpowerServic.CreateManpower(req.body);
    res.status(httpStatus.OK).send(machinaery);
});

//view

const getallManpower  = catchAsync(async (req, res) => {
    const { projectCode, projectActivity, projectMaster, description, nos,day,hoursperDay,salary} = req.query;
    const filter = {};
     if (projectCode) filter.projectCode = projectCode;
     if (projectActivity) filter.projectActivity = projectActivity;
     if (projectMaster) filter.projectMaster = projectMaster;
      if (nos) filter.nos = nos;
     if (day) filter.day = day;
     if (description) filter.description = description;
     if (hoursperDay) filter.hoursperDay = hoursperDay;
     if (salary) filter.salary = salary;
   
   const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const getall = await manpowerServic.queryManpower(filter,option);
    res.send(getall);
  });

//show
  const getManpower= catchAsync(async (req, res) => {
    const manpower = await manpowerServic.getManpowerById(req.params.masterId);
    if(!manpower) {
        throw new ApiError(httpStatus.NOT_FOUND, 'machinaery id not found');
    }
    res.send(manpower);
  });
//update
  const updateManpower = catchAsync(async (req, res) => {
    const manpower = await manpowerServic.updateManpowerById(req.params.masterId, req.body);
  
    if (!manpower) {
        return res.status(httpStatus.NOT_FOUND).json({ message: ' not found' });
    }
    res.send(manpower);
  });

  //delete
  const  deleteManpower= catchAsync(async (req, res) => {
    const manpower = await manpowerServic.deleteManpowerById(req.params.masterId);
  
    if (!manpower) {
      res.status(httpStatus.NOT_FOUND).json({ message: '  not found' });
    } else {
        res.status(httpStatus.OK).send('manpower id  deleted successfully');
    }
  });


module.exports={CreatManpower,getallManpower,getManpower,updateManpower,deleteManpower}