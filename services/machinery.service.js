const httpStatus = require("http-status");
const Machinery = require("../models/machinery.model");
const ApiError = require("../utils/ApiError");



//create
const CreateMachinery = async (machineryBody) => {
    const { kiloMeter, rate, ...rest } = machineryBody;

    const total = kiloMeter * rate;

    const newMachinery = {
        total, kiloMeter, rate, ...rest
    };
    newMachinery.createAt=new Date();

    return Machinery.create(newMachinery);
};

//view
const queryMachinery = async (filter, Option) => {
    const teams = await Machinery.paginate(filter, Option);
    return teams;
}
//show
const getMachineryById = async (id) => {
    return Machinery.findById(id);
}

//delete
const deleteMachineryById = async (id) => {
    const machinaery = await getMachineryById(id);
    if (!machinaery) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Machinery not found');
    }
    await machinaery.remove();
    return machinaery;
};

// update
const updateMachineryById = async(id, updateBody) => {
    const machinery = await getMachineryById(id);
    Object.assign(machinery, updateBody);
    machinery.updateAt = new Date();
    await machinery.save();
    return machinery;
}; 

module.exports = { CreateMachinery, queryMachinery, getMachineryById ,deleteMachineryById,updateMachineryById}