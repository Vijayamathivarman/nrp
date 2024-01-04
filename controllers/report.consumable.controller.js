
const httpStatus = require("http-status");
const { dailyoperationaladata } = require("../services");
const catchAsync = require("../utils/catchAsync");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const { date } = require("joi");





// const getconsumable = catchAsync(async (req, res) => {
//     const { projectCode, date, projectCompany, chainage, projectActivity } = req.query; 
  
//     const filter = {};
//     if (projectCode) filter.projectCode = projectCode;
//     if (date) filter.date = date;
//     if (projectCompany) filter.projectCompany = projectCompany;
//     if (chainage) filter.chainage = chainage;
//     if (projectActivity) filter.projectActivity = projectActivity;
  
//     const option = pick(req.query, ['sortBy', 'limit', 'page']);
//     // Specify the fields you want to retrieve using the 'select' method
//     option.select = 'comsumables';
  
//     const result = await dailyoperationaladata.queryDailyoperational(filter, option);
  
//     // Map the results to create the desired format
//     const dataToRetrieve = result.results.map(item => ({
//       projectCode: item.projectCode,
//       projectCompany: item.projectCompany,
//       date: item.date,
//       chainage: item.chainage,
//       projectActivity: item.projectActivity,
//       comsumables: item.comsumables,
//     }));
  
//     res.send(dataToRetrieve);
//   });


/////////////////////
// const getconsumable = catchAsync(async (req, res) => {
//   const { projectCode, date, projectCompany, chainage, projectActivity } = req.query;

//   const filter = {};
//   if (projectCode) filter.projectCode = projectCode;
//   if (date) filter.date = date;
//   if (projectCompany) filter.projectCompany = projectCompany;
//   if (chainage) filter.chainage = chainage;
//   if (projectActivity) filter.projectActivity = projectActivity;

//   const option = pick(req.query, ['sortBy', 'limit', 'page']);
//   option.select = 'comsumables';

//   const result = await dailyoperationaladata.queryDailyoperational(filter, option);


//   const dataToRetrieve = result.results.flatMap(item => {
   
//     const outer = {
//       projectCode: item.projectCode,
//       projectCompany: item.projectCompany,
//       date: item.date,
//       chainage: item.chainage,
//       projectActivity: item.projectActivity,
//     };

//     const consumablesDetails = item.comsumables.map(consumable => {
//       const originalSpecification = parseFloat(consumable.consumablesDetails.quantity);
//       const newSpecification = parseFloat(consumable.quantity);
//       const cumulativeDifference = originalSpecification - newSpecification;
//       const cumulativePercentage = (cumulativeDifference / originalSpecification) * 100;

//       return {
//         ...outer,
//         consumablesDetails: {
//           projectCode: consumable.consumablesDetails.projectCode,
//           projectActivity: consumable.consumablesDetails.projectActivity,
//           projectMaster: consumable.consumablesDetails.projectMaster,
//           description: consumable.consumablesDetails.description,
//           specification: consumable.consumablesDetails.specification,
//           uom: consumable.consumablesDetails.uom,
//           thickness: consumable.consumablesDetails.thickness,
//           quantity: consumable.consumablesDetails.quantity,
//           pricePerUnit: consumable.consumablesDetails.pricePerUnit,
//           createTime: consumable.consumablesDetails.createTime,
//         },
//         consumables: {
//           _id: consumable._id,
//           descriprtion: consumable.descriprtion,
//           specification: consumable.specification,
//           quantity: consumable.quantity,
//           cumulativeDifference: cumulativeDifference,
//           cumulativePercentage: cumulativePercentage,
//         },
//       };
//     });

//     return consumablesDetails;
//   });

//   res.send({ comsumables: dataToRetrieve });
// });

const getconsumable = catchAsync(async (req, res) => {
  const { projectCode, date, projectCompany, chainage, projectActivity } = req.query; 

  const filter = {};
  if (projectCode) filter.projectCode = projectCode;
  if (date) filter.date = date;
  if (projectCompany) filter.projectCompany = projectCompany;
  if (chainage) filter.chainage = chainage;
  if (projectActivity) filter.projectActivity = projectActivity;

  const option = pick(req.query, ['sortBy', 'limit', 'page']);
  // Specify the fields you want to retrieve using the 'select' method
  option.select = 'comsumables';

  const result = await dailyoperationaladata.queryDailyoperational(filter, option);

  // Map the results to create the desired format
  const dataToRetrieve = result.results.map(item => ({
    projectCode: item.projectCode,
    projectCompany: item.projectCompany,
    date: item.date,
    chainage: item.chainage,
    projectActivity: item.projectActivity,
    comsumables: item.comsumables,
  }
  ));

  res.send(dataToRetrieve);
});

  module.exports={getconsumable}


 