const Dailyoperationldata = require("../models/dailyoperationaldata.model");
const manpower = require('../services/manpower.service');
const consumable = require('../services/consumables.service');
const machinery = require('../services/machinery.service');
const instruments = require('../services/instruments.service');
const saftytools = require('../services/saftytools.service');
const toolsandtackles = require('../services/toolsandtackles.service');
const { ObjectId } = require('mongodb');
const ManpowerModel = require("../models/manpower.model");
const { json } = require("express");





// create
const CreateDailyoperational = async (data) => {
    
    const manpowerDetails = [];

    for (const manpowerEntry of data.dailyoperationalBody.manpower) {
        const objectIdManpowerId = new ObjectId(manpowerEntry.manpowerId);
        const manpowerData = await manpower.getManpowerById(objectIdManpowerId);

        console.log("manpowerData" + JSON.stringify(manpowerData));


        const combinedManpower = {
            ...manpowerEntry,
            manpowerDetails: manpowerData,
        };
       
        manpowerDetails.push(combinedManpower);
    }

    const consumablesDetails = [];


    for (const consumablesEntry of data.dailyoperationalBody.comsumables) {
        const objectIdConsumablesId = new ObjectId(consumablesEntry.consumablesId);
        const consumablesData = await consumable.getConsumableById(objectIdConsumablesId);

        // console.log("consumablesData" + JSON.stringify(consumablesData));
              const combinedConsumables = {
            ...consumablesEntry,
            consumablesDetails: consumablesData,
        };

        consumablesDetails.push(combinedConsumables);
    }

    
   const toolandTacklesDetails = [];
    for (const toolsandtacklesEntry of data.dailyoperationalBody.toolandTackles) {
        const objecIdtoolsandtackles = new ObjectId(toolsandtacklesEntry.toolandtacklesId)
        const toolsandtacklesData = await toolsandtackles.gettoolsandtacklesById(objecIdtoolsandtackles)
        console.log("toolsandtacklesData" + JSON.stringify(toolsandtacklesData));

        const combinedtoolandTackles = {
            ...toolsandtacklesEntry,
            toolandTacklesDetails: toolsandtacklesData,
        };
        toolandTacklesDetails.push(combinedtoolandTackles);

    }

    const instrumentsDetails = [];
    for (const instrumentsEntry of data.dailyoperationalBody.instruments) {


        const objecIdinstruments = new ObjectId(instrumentsEntry.instrumentsId);
        const instrumentsData = await instruments.getIntrumentsyById(objecIdinstruments)
        console.log("instrumentsData111" + JSON.stringify(instrumentsData));
        const combinedinstruments = {
            ...instrumentsEntry,
            instrumentsDetails: instrumentsData,
        };
        instrumentsDetails.push(combinedinstruments);
   console.log("instrumentsDetails" + JSON.stringify(instrumentsDetails));
    }

    const saftytoolsDetails = [];
    for (const saftytoolsEntry of data.dailyoperationalBody.saftytools) {


        const objecIdsaftytools = new ObjectId(saftytoolsEntry.saftytoolsId);
        const saftytoolsData = await saftytools.getSaftyToolsById(objecIdsaftytools)
        const combinedsaftytools = {
            ...saftytoolsEntry,
            saftytoolsDetails: saftytoolsData,
        };
        saftytoolsDetails.push(combinedsaftytools);

    }

      const machineryDetails = [];
    for (const machineryEntry of data.dailyoperationalBody.machinery) {


        const objecIdmachinery = new ObjectId(machineryEntry.machineryId);
        const machineryData = await machinery.getMachineryById(objecIdmachinery)
        const combinedmachinery = {
            ...machineryEntry,
            machineryDetails: machineryData,
        };
        machineryDetails.push(combinedmachinery);

    }

    const combinedData = {
        ...data.dailyoperationalBody,
        manpower: manpowerDetails,
        comsumables: consumablesDetails,
        toolandTackles: toolandTacklesDetails,
        instruments: instrumentsDetails,
        saftytools: saftytoolsDetails,
        machinery: machineryDetails
    };

    // console.log("combinedData" + JSON.stringify(combinedData));
     const createdData = await Dailyoperationldata.create(combinedData);
     return JSON.stringify(combinedData);
};

//view
const queryDailyoperational = async (filter, Option) => {
    const Dailyoperation = await Dailyoperationldata.paginate(filter, Option);
    return Dailyoperation;
}
//show
const getDailyoperationalById = async (id) => {
    return Dailyoperationldata.findById(id);
}
//update
const updateDailyoperationalById = async (id, updateBody) => {
    const code = await getDailyoperationalById(id);
    if (!code) {
        throw new ApiError(httpStatus.NOT_FOUND, 'id not found');
    }
    Object.assign(code, updateBody);
    code.updatedTime = new Date();
    await code.save();
    return code;
};
//delete
const deleteDailyoperationalById = async (id) => {
    const Dailyoperation = await getDailyoperationalById(id);
    if (!Dailyoperation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'id not found');
    }
    await Dailyoperation.remove();
    return Dailyoperation;
};


module.exports = { CreateDailyoperational, queryDailyoperational, getDailyoperationalById, updateDailyoperationalById, deleteDailyoperationalById }




