const httpStatus = require("http-status");
const  Intruments= require("../models/instruments.model");
const ApiError = require("../utils/ApiError");



//create
const CreateIntruments = async (intrumentsBody) => {
    const { quantity, price, ...rest } = intrumentsBody;

    const total = quantity * price;

    const newIntruments = {
        total,
        quantity,
        price, ...rest
    };
    newIntruments.createAt = new Date();
    newIntruments.updateAt = new Date();
    return Intruments.create(newIntruments);
};

//view
const queryIntruments = async (filter, Option) => {
    const teams = await Intruments.paginate(filter, Option);
    return teams;
}
//show
const getIntrumentsyById = async (id) => {
    return Intruments.findById(id);
}

//delete
const deleteIntrumentsById = async (id) => {
    const Intruments = await getIntrumentsyById(id);
    if (!Intruments) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Intruments not found');
    }
    await Intruments.remove();
    return Intruments;
};

//update
const updateIntrumentsyById = async(id, updateBody) => {
    const Intruments = await getIntrumentsyById(id);
    Object.assign(Intruments, updateBody);
    Intruments.updateAt = new Date();
    await Intruments.save();
    return Intruments;
}; 


const descriptionall = async (filter) => {
    const alldescription = await Intruments.find(filter);
    const all = alldescription.map(item => item.description);
    return all;
  };

module.exports = { CreateIntruments,getIntrumentsyById,queryIntruments,
    deleteIntrumentsById,updateIntrumentsyById,descriptionall}