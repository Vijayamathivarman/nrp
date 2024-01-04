const { reportdashboardservice } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");


const reportdashboradDatas = catchAsync(async (req, res) => {
  const { projectCode, projectMaster, description, startDate, endDate } = req.query;
  const filter = {};

  if (startDate && endDate) {
    filter.date = { $gte: startDate, $lte: endDate };
  } else if (startDate) {
    filter.date = { $gte: startDate };
  } else if (endDate) {
    filter.date = { $lte: endDate };
  }

  if (projectMaster) filter.projectMaster = projectMaster;
  if (projectCode) filter.projectCode = projectCode;
  if (description) filter.description = description;

  const reportdashboradtotal = await reportdashboardservice.calculateConsumableExpenses(filter);
  const reportmachinery = await reportdashboardservice.machineryexpense(filter);
  const ToolsandtacklesExpenses = await reportdashboardservice.ToolsandtacklesExpenses(filter);
  const saftytoolsExpenses = await reportdashboardservice.saftytoolsExpenses(filter);
  const instrumentsExpenses = await reportdashboardservice.instrumentsExpenses(filter);

  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  options.sortBy = options.sortBy || 'createdAt:desc';

  res.send({ reportdashboradtotal, reportmachinery, ToolsandtacklesExpenses, instrumentsExpenses, saftytoolsExpenses });
});


  module.exports={reportdashboradDatas}