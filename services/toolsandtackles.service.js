const httpStatus = require('http-status');
// const toolsandTackles = require('../models/toolsandtackles.model');
const  toolsandTackles= require("../models/toolsandtackles.model");
const ApiError = require('../utils/ApiError');


//create
const Createtoolsandtackles = async (toolsBody) => {
    const { quantity, price, ...rest } = toolsBody;

    const total = quantity * price;

    const newtool = {
        total,
        quantity,
         price, ...rest
    };
    newtool.createAt = new Date();
    newtool.updateAt = new Date();
    // return toolsandTackles.create(newtool);
   return toolsandTackles.create(newtool);
};


//view
const querytoolsandtackles = async (filter, Option) => {
    const tools = await toolsandTackles.paginate(filter, Option);
    return tools;
}
//show
const gettoolsandtacklesById = async (id) => {
    return toolsandTackles.findById(id);
}

//delete
const deletetoolsandtacklesById = async (id) => {
    const tools = await gettoolsandtacklesById(id);
    if (!tools) {
        throw new ApiError(httpStatus.NOT_FOUND, 'tools&tackles not found');
    }
    await tools.remove();
    return tools;
};

//update
const updatetoolsandtacklesById = async (id, updateBody) => {
    const tools = await gettoolsandtacklesById(id);
    Object.assign(tools, updateBody);
    tools.updateAt= new Date();
    await tools.save();
    return tools;
};

//descriptionall
const descriptionall = async (filter) => {
    const alldescription = await toolsandTackles.find(filter);
    const all = alldescription.map(item => item.description);
    return all;
  };

module.exports = { Createtoolsandtackles, querytoolsandtackles, gettoolsandtacklesById, deletetoolsandtacklesById, updatetoolsandtacklesById,descriptionall }