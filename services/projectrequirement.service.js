const { filter } = require("compression");
const { Consumables, instruments ,Manpower, Machinery} = require("../models");
const SaftyTools = require("../models/saftytools.model");
const Toolsandtackles = require("../models/toolsandtackles.model");
// const Manpower = require("../models/manpower.model");
// const Manpower = require("../models/manpower.model");



// const countProjectActivities = async (filter) => {
//     const total = await Consumables.aggregate([
//         { $match: filter },
//         { $group: { _id: { activity: '$projectActivity', price: '$pricePerUnit' }, count: { $sum: 1 } } },
//     ]);

//     return total.map(item => ({
//         projectActivity: item._id.activity,
//         Consumables: item._id.price,
       
//     }));
// };


// Assuming this code is inside an asynchronous function or a module that supports async code
//////////////////////////////////////////////////////////////////////
// const countProjectActivities = async (filter) => {
//     // Aggregation for Consumables collection
//     const totalConsumables = await Consumables.aggregate([
//         { $match: filter },
//         { $group: { _id: { activity: '$projectActivity', price: '$pricePerUnit' }, count: { $sum: 1 } } },
//     ]);

// //     // Aggregation for instruments collection
//     const totalInstruments = await instruments.aggregate([
//         { $match: filter },
//         { $group: { _id: { activity: '$projectActivity', price: '$price' }, count: { $sum: 1 } } },
//     ]);

// //     const totalManpwer= await  Manpower.aggregate([
// //         {$match:filter},
// //         {$group:{_id:{activity:'$projectActivity',price:'$salary'},count:{$sum:1}}},
// //     ]);


// //    const totalMachinery=await Machinery.aggregate([
// //     {$match:filter},
// //     {$group:{_id:{activity:'$projectActivity',price:'$rate'},count:{$sum:1}}},
// //    ]);

// //    const totalToolsandtackles=await Toolsandtackles.aggregate([
// //     {$match:filter},
// //     {$group:{_id:{activity:'$projectActivity',price:'$price'},count:{$sum:1}}},
// //    ]);


// //    const totalSaftyTools=await SaftyTools.aggregate([
// //     {$match:filter},
// //     {$group:{_id:{activity:'$projectActivity',price:'$price'},count:{$sum:1}}},
// //    ])

//     // Combine results from both collections
    // const combinedResults = {};

    // totalConsumables.forEach(item => {
    //     const activity = item._id.activity;
    //     combinedResults[activity] = {
    //         ...combinedResults[activity],
    //         projectActivity: activity,
    //         Consumables: item._id.price,
    //     };
    // });

    // totalInstruments.forEach(item => {
    //     const activity = item._id.activity;
    //     combinedResults[activity] = {
    //         ...combinedResults[activity],
    //         projectActivity: activity,
    //         Instruments: item._id.price,
    //     };
    // });


//     // totalManpwer.forEach(item => {
//     //     const activity = item._id.activity;
//     //     combinedResults[activity] = {
//     //         ...combinedResults[activity],
//     //         projectActivity: activity,
//     //         Manpower: item._id.price,
//     //     };

//     // });

//     // totalMachinery.forEach(item=>{
//     //    const activity= item._id.activity;
//     //    combinedResults[activity]={
//     //     ...combinedResults[activity],
//     //     projectActivity:activity,
//     //     Machinery:item._id.price,
//     //    };

//     // });
//     // totalToolsandtackles.forEach(item=>{
//     //     const activity= item._id.activity;
//     //     combinedResults[activity]={
//     //      ...combinedResults[activity],
//     //      projectActivity:activity,
//     //      Toolsandtackles:item._id.price,
//     //     };
 
//     //  });
//     //  totalSaftyTools.forEach(item=>{
//     //     const activity= item._id.activity;
//     //     combinedResults[activity]={
//     //      ...combinedResults[activity],
//     //      projectActivity:activity,
//     //      SaftyTools:item._id.price,
//     //     };
 
//     //  })

//     return Object.values(combinedResults);
// };

// // Example usage:
// const fetchData = async () => {
//     const filter = { /* your filter criteria */ };

//     try {
//         const result = await countProjectActivities(filter);
//         console.log(result);
//     } catch (error) {
//         console.error(error);
//     }
// };

// // Call the async function
// fetchData();


// // Example usage:
// // const fetchData = async () => {
// //     const filter = { /* your filter criteria */ };

// //     try {
// //         const result = await countProjectActivities(filter);
// //         console.log(result);
// //     } catch (error) {
// //         console.error(error);
// //     }
// // };

// // // Call the async function
// // fetchData();
/////////////////////////////////////////////////////

// 222222222222222
// const countProjectActivities = async (filter) => {

//     const totalConsumables = await Consumables.aggregate([
//         { $match: filter },
//         {
//             $group: {
//                 _id: {
                   
//                     code: '$projectCode',
//                     master: '$projectMaster',
//                 },
//                 requirements: {
//                     $push: {
//                         activity: '$projectActivity',
//                         type: 'consumable',
//                         description: '$description',
//                         quantity: '$quantity',
//                         pricePerUnit: '$pricePerUnit',
//                     },
//                 },
//             },
//         },
//     ]);

//     const combinedResults = totalConsumables.map(item => {
//         return {
//             projectActivity: item._id.activity,
//             projectCode: item._id.code,
//             projectMaster: item._id.master,
//             requirements: item.requirements,
//         };
//     });

//     return combinedResults;
// };


const countProjectActivities = async (filter) => {
    // Aggregation for Consumables collection
    const totalConsumables = await Consumables.aggregate([
        { $match: filter },
        {
            $group: {
                _id: {
                    code: '$projectCode',
                    master: '$projectMaster',
                    activity: '$projectActivity',
                },
                pricePerUnit: { $sum: '$pricePerUnit' },
                type: { $first: 'Consumables' },
                description: { $first: '$description' },
                quantity:{$first:'$quantity'}
            },
        },
    ]);

    // Aggregation for instruments collection
    const totalInstruments = await instruments.aggregate([
        { $match: filter },
        {
            $group: {
                _id: {
                    code: '$projectCode',
                    master: '$projectMaster',
                    activity: '$projectActivity',
                },
                pricePerUnit: { $sum: '$price' },
                type: { $first: 'Instruments' },
                description: { $first: '$description' },
                quantity:{$first:'$quantity'}
            },
        },
    ]);


 const totalManpower=await Manpower.aggregate([
    {$match:filter},
    {$group:{
        _id:{
            code:'$projectCode',
            master:'$projectMaster',
            activity:'$projectActivity',
        },
        pricePerUnit:{$sum:"$salary"},
        type:{$first:'Manpower'},
        description:{$first:'$description'},
        hoursperDay:{$first:'$hoursperDay'}
    }}
 ]);

 const totalMachinery=await Machinery.aggregate([
    {$match:filter},
    {$group:{
        _id:{
            code:'$projectCode',
            master:'$projectMaster',
            activity:'$projectActivity',
        },
        
        type:{$first:'Machinery'},
        description:{$first:'$description'},
        fuelQty:{$first:'$fuelQty'},
        rate:{$first:'$rate'}
    }}
 ]);

    const totalSaftyTools=await SaftyTools.aggregate([
    {$match:filter},
    {$group:{
        _id:{
            code:'$projectCode',
            master:'$projectMaster',
            activity:'$projectActivity',
        },
        pricePerUnit:{$sum:"$price"},
        type:{$first:'SaftyTools'},
        description:{$first:'$description'},
        quantity:{$first:'$quantity'},
        
    }}
 ]);
 const totalToolsandtackles=await Toolsandtackles.aggregate([
    {$match:filter},
    {$group:{
        _id:{
            code:'$projectCode',
            master:'$projectMaster',
            activity:'$projectActivity',
        },
        pricePerUnit:{$sum:"$price"},
        type:{$first:'Toolsandtackles'},
        description:{$first:'$description'},
        quantity:{$first:'$quantity'},
        
    }}
 ])




    const combinedResults = {};

    totalConsumables.forEach(item => {
        const key = `${item._id.code}-${item._id.master}`;
        if (!combinedResults[key]) {
            combinedResults[key] = {
                projectCode: item._id.code,
                projectMaster: item._id.master,
                requirements: [],
            };
        }

        combinedResults[key].requirements.push({
            projectActivity: item._id.activity,
            pricePerUnit: item.pricePerUnit,
            type: item.type,
            description:item.description,
            quantity:item.quantity,
           
        });
    });

    totalInstruments.forEach(item => {
        const key = `${item._id.code}-${item._id.master}`;
        if (!combinedResults[key]) {
            combinedResults[key] = {
                projectCode: item._id.code,
                projectMaster: item._id.master,
                requirements: [],
            };
        }

        combinedResults[key].requirements.push({
            projectActivity: item._id.activity,
            pricePerUnit: item.pricePerUnit,
            type: item.type,
            description:item.description,
            quantity:item.quantity
        });
    });


    totalManpower.forEach(item => {
        const key = `${item._id.code}-${item._id.master}`;
        if (!combinedResults[key]) {
            combinedResults[key] = {
                projectCode: item._id.code,
                projectMaster: item._id.master,
                requirements: [],
            };
        }

        combinedResults[key].requirements.push({
            projectActivity: item._id.activity,
            pricePerUnit: item.pricePerUnit,
            type: item.type,
            // description:item.description,
            hoursperDay:item.hoursperDay
        });
    });

    totalMachinery.forEach(item => {
        const key = `${item._id.code}-${item._id.master}`;
        if (!combinedResults[key]) {
            combinedResults[key] = {
                projectCode: item._id.code,
                projectMaster: item._id.master,
                requirements: [],
            };
        }

        combinedResults[key].requirements.push({
            projectActivity: item._id.activity,
            pricePerUnit: item.rate,
            type: item.type,
            description:item.description,
            fuelQty:item.fuelQty
        });
    });


    totalSaftyTools.forEach(item => {
        const key = `${item._id.code}-${item._id.master}`;
        if (!combinedResults[key]) {
            combinedResults[key] = {
                projectCode: item._id.code,
                projectMaster: item._id.master,
                requirements: [],
            };
        }

        combinedResults[key].requirements.push({
            projectActivity: item._id.activity,
            pricePerUnit: item.pricePerUnit,
            type: item.type,
            description:item.description,
            quantity:item.quantity
        });
    });
    

    totalToolsandtackles.forEach(item => {
        const key = `${item._id.code}-${item._id.master}`;
        if (!combinedResults[key]) {
            combinedResults[key] = {
                projectCode: item._id.code,
                projectMaster: item._id.master,
                requirements: [],
            };
        }

        combinedResults[key].requirements.push({
            projectActivity: item._id.activity,
            pricePerUnit: item.pricePerUnit,
            type: item.type,
            description:item.description,
            quantity:item.quantity
        });
    });
    return Object.values(combinedResults);
};




//requirementcount



module.exports={countProjectActivities}