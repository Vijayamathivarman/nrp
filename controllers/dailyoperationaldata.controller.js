const httpStatus = require("http-status");
const { dailyoperationaladata } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");


//create
const createDailyoperationldata = catchAsync(async (req, res) => {
    const dailyoperational = await dailyoperationaladata.CreateDailyoperational(req.body);
    res.status(httpStatus.OK).send(dailyoperational);
  });
  
  //view
const getallDailyoperationldata = catchAsync(async (req, res) => {
  const filter = {};

  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  const getall = await dailyoperationaladata.queryDailyoperational(filter, option);
  res.send(getall);
});

//show 
const getDailyoperationldata = catchAsync(async (req, res) => {
  const dailyoperational = await dailyoperationaladata.getDailyoperationalById(req.params.masterId);
  if (!dailyoperational) {
    throw new ApiError(httpStatus.NOT_FOUND, 'id not found');
  }
  res.send(dailyoperational);
});

// update
const updateDailyoperationldata= catchAsync(async (req, res) => {
  const dailyoperational = await dailyoperationaladata.updateDailyoperationalById(req.params.masterId, req.body);
 res.send(dailyoperational);
 
});


//delete
const deleteDailyoperationldata = catchAsync(async (req, res) => {
  const result = await dailyoperationaladata.deleteDailyoperationalById(req.params.masterId);

  if (!result) {
    res.status(httpStatus.NOT_FOUND).json({ message: ' id not found' });
  } else {
    res.status(httpStatus.OK).send(' deleted successfully');
  }
});




module.exports={createDailyoperationldata,getallDailyoperationldata,getDailyoperationldata,updateDailyoperationldata,deleteDailyoperationldata}