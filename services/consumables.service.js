const httpStatus = require("http-status");
const Consumables = require("../models/consumable.model");
const ApiError = require("../utils/ApiError");
const { consumablesService } = require(".");




//create  
const CreateConsumables = async (consumablesBody) => {
    
    consumablesBody.createAt = new Date();
    consumablesBody.updateAt = new Date();
    return Consumables.create(consumablesBody);
}
//view
const queryConsumables = async (filter, Option) => {
    const teams = await Consumables.paginate(filter, Option);
    return teams;
}

//show
const getConsumableById = async (id) => {
    return Consumables.findById(id);
}
//update
const updateConsumableById = async (id, updateBody) => {
    const code = await getConsumableById(id);
    if (!code) {
        throw new ApiError(httpStatus.NOT_FOUND, 'id not found');
    }
    Object.assign(code, updateBody);
    code.updateAt = new Date();
    await code.save();
    return code;
};
//delete
const deleteConsumableById = async (id) => {
    const master = await getConsumableById(id);
    if (!master) {
        throw new ApiError(httpStatus.NOT_FOUND, 'id not found');
    }
    await master.remove();
    return master;
    
};



const descriptionall = async (filter) => {
  const alldescription = await Consumables.find(filter);
  const all = alldescription.map(item => item.description);
  return all;
};

module.exports = { CreateConsumables, queryConsumables, getConsumableById, updateConsumableById, deleteConsumableById,descriptionall }