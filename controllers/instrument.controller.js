const httpStatus = require("http-status");
const {instrumentsService } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");


//create
const CreatIntruments = catchAsync(async (req, res) => {
  const Intruments = await instrumentsService.CreateIntruments(req.body);
  res.status(httpStatus.OK).send(Intruments);
});

//view
const getallIntruments = catchAsync(async (req, res) => {
  const { projectCode, projectActivity, projectMaster, description, quantity, price} = req.query;
  const filter = {};
  if (projectCode) filter.projectCode = projectCode;
  if (projectActivity) filter.projectActivity = projectActivity;
  if (projectMaster) filter.projectMaster = projectMaster;
  if (description) filter.description = description;
  if (quantity) filter.quantity = quantity;
  if (price) filter.price = price;

  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const getall = await instrumentsService.queryIntruments(filter, option);
  res.send(getall);
});

//show
const getIntruments = catchAsync(async (req, res) => {
  const Intruments = await instrumentsService.getIntrumentsyById(req.params.masterId);
  if (!Intruments) {
    throw new ApiErroror(httpStatus.NOT_FOUND, 'machinaery id not found');
  }
  res.send(Intruments);
});

//delete
const deleteIntruments = catchAsync(async (req, res) => {
  const Intruments = await instrumentsService.deleteIntrumentsById(req.params.masterId);

  if (!Intruments) {
    res.status(httpStatus.NOT_FOUND).json({ message: ' Intruments id not found' });
  } else {
    res.status(httpStatus.OK).send('Intruments id  deleted successfully');
  }
});

//update
const updateIntruments = catchAsync(async (req, res) => {
  const Intruments = await instrumentsService.updateIntrumentsyById(req.params.masterId, req.body);

  if (!Intruments) {
    return res.status(httpStatus.NOT_FOUND).json({ message: '  not found' });
  }

  res.send(Intruments);
});

const alldescription = catchAsync(async (req, res) => {

  const filter={}
  const alldescriptions = await instrumentsService.descriptionall(filter);
  res.send({Description:alldescriptions});
});


module.exports = { CreatIntruments, getallIntruments,getIntruments,updateIntruments,deleteIntruments,alldescription}