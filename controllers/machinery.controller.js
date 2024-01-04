const httpStatus = require("http-status");
const { machinaeryService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");


// //create
const Creatmachinery = catchAsync(async (req, res) => {
  const machinaery = await machinaeryService.CreateMachinery(req.body);
  res.status(httpStatus.OK).send(machinaery);
});

//view
const getallMachinery = catchAsync(async (req, res) => {
  const { projectCode, projectActivity, projectMaster, description, hours, kiloMeter, fuelQty, noOfMachines, rate,total} = req.query;
  const filter = {};
  if (projectCode) filter.projectCode = projectCode;
  if (projectActivity) filter.projectActivity = projectActivity;
  if (projectMaster) filter.projectMaster = projectMaster;
  if (description) filter.description = description;
  if (hours) filter.hours = hours;
  if (kiloMeter) filter.kiloMeter = kiloMeter;
  if (fuelQty) filter.fuelQty = fuelQty;
  if (noOfMachines) filter.noOfMachines = noOfMachines;
  if (rate) filter.rate = rate;
  if (total) filter.total = total;
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const getall = await machinaeryService.queryMachinery(filter, option);
  res.send(getall);
});

//show
const getMachinery = catchAsync(async (req, res) => {
  const machinaery = await machinaeryService.getMachineryById(req.params.masterId);
  if (!machinaery) {
    throw new ApiError(httpStatus.NOT_FOUND, 'machinaery id not found');
  }
  res.send(machinaery);
});

//delete
const deleteMachinery = catchAsync(async (req, res) => {
  const machinery = await machinaeryService.deleteMachineryById(req.params.masterId);

  if (!machinery) {
    res.status(httpStatus.NOT_FOUND).json({ message: '  not found' });
  } else {
    res.status(httpStatus.OK).send('machinery id  deleted successfully');
  }
});

//update
const updateMachinery = catchAsync(async (req, res) => {
  const machinery = await machinaeryService.updateMachineryById(req.params.masterId, req.body);

  if (!machinery) {
    return res.status(httpStatus.NOT_FOUND).json({ message: ' not found' });
  }
  const response = {
    message: machinery,

  };

  res.send(response);
});



module.exports = { Creatmachinery, getallMachinery, getMachinery, deleteMachinery, updateMachinery }