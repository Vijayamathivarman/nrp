
const ProjectMaster = require('../models/projectmaster.model');
const projectCode = require('../models/projectcode.model');
const Consumables  = require('../models/consumable.model');
const { Manpower, instruments, saftyTools, Machinery } = require('../models');
const Toolsandtackles = require('../models/toolsandtackles.model');


// const countprojectmaster = async (filter) => {
//     const total = await ProjectMaster.countDocuments(filter);
//     return { projectmasterCounts: total.toString() };
// };

// const countProjectActivities = async (filter) => {
//     const total = await ProjectMaster.aggregate([
//         { $match: filter },
//         { $unwind: '$projectMasterActivity' },
//         { $group: { _id: null, count: { $sum: 1 } } },
//     ]);

//     return {
//         ActivityCounts: total[0] ? total[0].count.toString() : "0"
//     };
// };
const countcode = async (filter) => {
    const total = await projectCode.countDocuments(filter); // Assuming there's a CodeModel for counting codes

    return { count: total };
};

const countcompnay = async (filter) => {
    const total = await projectCode.countDocuments(filter); // Assuming there's a CompanyModel for counting companies

    return { count: total };
};



const countprojectmaster = async (filter) => {
    const total = await ProjectMaster.countDocuments(filter);

    return { count: total }
};


const countProjectActivities = async (filter) => {
    const total = await ProjectMaster.aggregate([
        { $match: filter },
        { $unwind: '$projectMasterActivity' },
        { $group: { _id: null, count: { $sum: 1 } } },
    ]);

    return {
        count: total[0] ? total[0].count : 0
    };
};

// const countcode = async (filter) => {
//     const total = await projectCode.countDocuments(filter);

//     return { count: total }
// };
// const countcompnay = async (filter) => {
//     const total = await projectCode.countDocuments(filter);

//     return { count: total }
// };




const projectrequirementcount= async(filter)=>{
  const totalConsumables = await Consumables.countDocuments(filter);
        
return {count:totalConsumables}
};
const manpowercount= async(filter)=>{
    const totalManpower = await Manpower.countDocuments(filter);
          
  return {count:totalManpower}
  };
  const instrumentcount= async(filter)=>{
    const totalinstrument = await  instruments.countDocuments(filter);
          
  return {count:totalinstrument}
  };
  const SaftyToolscount= async(filter)=>{
    const totalSafty = await saftyTools.countDocuments(filter);
          
  return {count:totalSafty}
  };
  const machinerycount= async(filter)=>{
    const totalMachinery = await Machinery.countDocuments(filter);
          
  return {count:totalMachinery}
  };
  const toolsandtacklescount= async(filter)=>{
    const totaltoolsandtackles = await Toolsandtackles.countDocuments(filter);
          
  return {count:totaltoolsandtackles}
  };
module.exports = {
    countprojectmaster, countProjectActivities, countcode, countcompnay,projectrequirementcount,manpowercount,instrumentcount,SaftyToolscount,machinerycount,toolsandtacklescount
}

