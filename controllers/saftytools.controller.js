const httpStatus = require("http-status");
const {saftyToolsService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");


//create
const CreatSaftyTools = catchAsync(async (req, res) => {
  const Intruments = await saftyToolsService.CreateSaftyTools(req.body);
  res.status(httpStatus.OK).send(Intruments);
});

//view
const getallSaftyTools = catchAsync(async (req, res) => {
   const { projectCode, projectActivity, projectMaster, description, quantity, price} = req.query;
  const filter = {};
  if (projectCode) filter.projectCode = projectCode;
  if (projectActivity) filter.projectActivity = projectActivity;
  if (projectMaster) filter.projectMaster = projectMaster;
  if (description) filter.description = description;
  if (quantity) filter.quantity = quantity;
  if (price) filter.price = price;

  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const getall = await saftyToolsService.querySaftyTools(filter, option);
  res.send(getall);
});

//show
const getSaftyTools = catchAsync(async (req, res) => {
  const SaftyTools = await saftyToolsService.getSaftyToolsById(req.params.masterId);
  if (!SaftyTools) {
    throw new ApiErroror(httpStatus.NOT_FOUND, 'SaftyToolsy id not found');
  }
  res.send(SaftyTools);
});

//delete
const deleteSaftyTools= catchAsync(async (req, res) => {
  const SaftyTools = await saftyToolsService.deleteSaftyToolsById(req.params.masterId);

  if (!SaftyTools) {
    res.status(httpStatus.NOT_FOUND).json({ message: 'SaftyTools id not found' });
  } else {
    res.status(httpStatus.OK).send('SaftyTools id  deleted successfully');
  }
});

//update
const updateSaftyTools = catchAsync(async (req, res) => {
  const SaftyTools = await saftyToolsService.updateSaftyToolsById(req.params.masterId, req.body);

  if (!SaftyTools) {
    return res.status(httpStatus.NOT_FOUND).json({ message: '  not found' });
  }
  
  res.send(SaftyTools);
});

const alldescription = catchAsync(async (req, res) => {

  const filter={}
  const alldescriptions = await saftyToolsService.descriptionall(filter);
  res.send({Description:alldescriptions});
});


module.exports = { CreatSaftyTools, getallSaftyTools,getSaftyTools,deleteSaftyTools,updateSaftyTools,alldescription}