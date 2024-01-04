
const httpStatus = require("http-status");
const { consumablesService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");



//create
const CreateConsumables = catchAsync(async (req, res) => {
  const consumable = await consumablesService.CreateConsumables(req.body);
  res.status(httpStatus.OK).send(consumable);
});



//view
const getallConsumables = catchAsync(async (req, res) => {
  const { projectCode, projectActivity, projectMaster, description, specification, uom, thickness, quantity, pricePerUnit } = req.query;
  const filter = {};
  if (projectCode) filter.projectCode = projectCode;
  if (projectActivity) filter.projectActivity = projectActivity;
  if (projectMaster) filter.projectMaster = projectMaster;
  if (description) filter.description = description;
  if (specification) filter.specification = specification;
  if (uom) filter.uom = uom;
  if (thickness) filter.thickness = thickness;
  if (quantity) filter.quantity = quantity;
  if (pricePerUnit) filter.pricePerUnit = pricePerUnit;
  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const getall = await consumablesService.queryConsumables(filter, option);
  res.send(getall);
});

//show 
const getConsumable = catchAsync(async (req, res) => {
  const consumable = await consumablesService.getConsumableById(req.params.masterId);
  if (!consumable) {
    throw new ApiError(httpStatus.NOT_FOUND, 'id not found');
  }
  res.send(consumable);
});

// update
const updateConsumable = catchAsync(async (req, res) => {
  const master = await consumablesService.updateConsumableById(req.params.masterId, req.body);
 res.send(master);
 
});


//delete
const deleteConsumable = catchAsync(async (req, res) => {
  const result = await consumablesService.deleteConsumableById(req.params.masterId);

  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({ message: ' id not found' });
  } else {
    res.status(httpStatus.OK).send(' deleted successfully');
  }
});


//getdescription

const alldescription = catchAsync(async (req, res) => {

  const filter={}
  const alldescriptions = await consumablesService.descriptionall(filter);
  res.send({Description:alldescriptions});
});


module.exports = { CreateConsumables, getallConsumables, getConsumable, updateConsumable, deleteConsumable ,alldescription}