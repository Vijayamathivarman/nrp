
const httpStatus = require("http-status");
const { dailyoperationaladata } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { date } = require("joi");





const gettoolsandtackles= catchAsync(async (req, res) => {
    const { projectCode, date, projectCompany, chainage, projectActivity } = req.query; // Assuming you want to filter by both projectCode and date
  
    const filter = {};
    if (projectCode) filter.projectCode = projectCode;
    if (date) filter.date = date;
    if (projectCompany) filter.projectCompany = projectCompany;
    if (chainage) filter.chainage = chainage;
    if (projectActivity) filter.projectActivity = projectActivity;
  
    const option = pick(req.query, ['sortBy', 'limit', 'page']);
    // Specify the fields you want to retrieve using the 'select' method
    option.select = 'toolandTackles';
  
    const result = await dailyoperationaladata.queryDailyoperational(filter, option);
  
    // Map the results to create the desired format
    const dataToRetrieve = result.results.map(item => ({
      projectCode: item.projectCode,
      projectCompany: item.projectCompany,
      date: item.date,
      chainage: item.chainage,
      projectActivity: item.projectActivity,
      toolandTackles: item.toolandTackles,
    }));
  
    res.send(dataToRetrieve);
  });
  

  module.exports={gettoolsandtackles}