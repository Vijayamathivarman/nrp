   const httpStatus = require('http-status');
const manpower=require('../models/manpower.model');
const ApiError = require('../utils/ApiError');
const projectTeam = require('../services/projectteam.service');
const { ObjectId } = require('mongodb');


const getManpowerById = async (id) => {
    // console.error('tgyuhijo in getManpowerById:',id);
      try {
        return await manpower.findById(id);
    } catch (error) {
     
        console.error('Error in getManpowerById:', error.message);
        throw error;
    }
};
//////////////////////

// const CreateManpower = async (data) => {
    
//     const projectTeamDetails = [];

//     for (const projectTeamEntry of data.dailyoperationalBody.projectTeam) {
//         const objectIdprojectTeamId = new ObjectId (projectTeamEntry.projectTeamId);
//         const projectTeamData = await projectTeam.getprojectTeamById(objectIdprojectTeamId);

//         console.log("projectTeamDatass" + JSON.stringify(projectTeamData));


//         const combinedprojectTeam = {
//             ...projectTeamEntry,
//             projectTeamDetails: projectTeamData,
//         };
       
//         projectTeamDetails.push(combinedprojectTeam);
//     }


//     const combinedData = {
//         ...data.dailyoperationalBody,
//         projectTeam: projectTeamDetails,

//     };

//     // console.log("combinedData" + JSON.stringify(combinedData));
//      const createdData = await manpower.create(combinedData);
//      return JSON.stringify(combinedData);
// };



////////////////////////////
//create
const CreateManpower = async (manpoerBody) => {
    const { hoursperDay, salary, ...rest } = manpoerBody;

    const total = hoursperDay * salary;

    const newmanpower = {
        total,hoursperDay,salary, ...rest
    };
    newmanpower.createAt = new Date();
    newmanpower.updateAt = new Date();
    return manpower.create(newmanpower);
};

//view
const queryManpower = async (filter, Option) => {
    const teams = await manpower.paginate(filter, Option);
    return teams;
}

//show
// const getManpowerById = async (id) => {
//     return manpower.findById(id);
// }
//update
const updateManpowerById = async(id, updateBody) => {
    const Manpower = await getManpowerById(id);
    Object.assign(Manpower, updateBody);
    Manpower.updateAt = new Date();
    await Manpower.save();
    return Manpower;
}; 
//delete
const deleteManpowerById = async (id) => {
    const Manpower = await getManpowerById(id);
    if (!Manpower) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Manpower id not found');
    }
    await Manpower.remove();
    return Manpower;
};



// // get name with id 
// const countProjectActivities = async (filter) => {
//     // Aggregation for Consumables collection
//     const names = await Consumables.aggregate([
//         { $match: filter },
//         {
//             $group: {
//                 _id: {
//                     code: '$projectCode',
//                     master: '$projectMaster',
//                     activity: '$projectActivity',
//                 },
//                 pricePerUnit: { $sum: '$pricePerUnit' },
//                 type: { $first: 'Consumables' },
//                 description: { $first: '$description' },
//                 quantity:{$first:'$quantity'}
//             },
//         },
//     ]);
// }

module.exports={CreateManpower,queryManpower,getManpowerById,updateManpowerById,deleteManpowerById}