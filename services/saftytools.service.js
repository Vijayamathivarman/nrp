const httpStatus = require("http-status");
const  SaftyTools= require("../models/saftytools.model");
const ApiError = require("../utils/ApiError");



//create
const CreateSaftyTools = async (saftytoolsBody) => {
    const { quantity, price, ...rest } = saftytoolsBody;

    const total = quantity * price;

    const newSaftyTools = {
        total,
        quantity,
        price, ...rest
    };
    newSaftyTools.createAt = new Date();
    newSaftyTools.updateAt = new Date();
    return SaftyTools.create(newSaftyTools);
};

//view
const querySaftyTools = async (filter, Option) => {
    const saftyTools = await SaftyTools.paginate(filter, Option);
    return saftyTools;
}
//show
const getSaftyToolsById = async (id) => {
    return SaftyTools.findById(id);
}

//delete
const deleteSaftyToolsById = async (id) => {
    const SaftyTools = await getSaftyToolsById(id);
    if (!SaftyTools) {
        throw new ApiError(httpStatus.NOT_FOUND, 'SaftyTools not found');
    }
    await SaftyTools.remove();
    return SaftyTools;
};

//update
const updateSaftyToolsById = async(id, updateBody) => {
    const SaftyTools = await getSaftyToolsById(id);
    Object.assign(SaftyTools, updateBody);
    SaftyTools.updateAt=new Date();
    await SaftyTools.save();
    return SaftyTools;
}; 

//
const descriptionall = async (filter) => {
    const alldescription = await SaftyTools.find(filter);
    const all = alldescription.map(item => item.description);
    return all;
  };


module.exports = {updateSaftyToolsById,deleteSaftyToolsById,getSaftyToolsById,querySaftyTools,CreateSaftyTools,descriptionall}