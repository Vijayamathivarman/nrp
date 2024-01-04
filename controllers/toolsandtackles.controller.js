const httpStatus = require("http-status");
const { toolsandtacklesServic } = require("../services");
const catchAsync = require("../utils/catchAsync");
const ApiError = require("../utils/ApiError");
const pick = require("../utils/pick");



//create
const Creattoolsandtackles = catchAsync(async (req, res) => {
    const tools = await toolsandtacklesServic.Createtoolsandtackles(req.body);
    res.status(httpStatus.OK).send(tools);
});


//view
const getalltoolsandtackles = catchAsync(async (req, res) => {
    const { projectCode, projectActivity, projectMaster, description, quantity, price } = req.query;
    const filter = {};
    if (projectCode) filter.projectCode = projectCode;
    if (projectActivity) filter.projectActivity = projectActivity;
    if (projectMaster) filter.projectMaster = projectMaster;
    if (description) filter.description = description;
    if (quantity) filter.quantity = quantity;
    if (price) filter.price = price;

    const option = pick(req.query, ['sortBy', 'limit', 'page']);
    const getall = await toolsandtacklesServic.querytoolsandtackles(filter, option);
    res.send(getall);
});

//show
const gettoolsandtackles = catchAsync(async (req, res) => {
    const toolsandtackles = await toolsandtacklesServic.gettoolsandtacklesById(req.params.masterId);
    if (!toolsandtackles) {
        throw new ApiError(httpStatus.NOT_FOUND, 'toolsandtackles id not found');
    }
    res.send(toolsandtackles);
});

//delete
const deletetoolsandtackles = catchAsync(async (req, res) => {
    const toolsandtackles = await toolsandtacklesServic.deletetoolsandtacklesById(req.params.masterId);

    if (!toolsandtackles) {
        res.status(httpStatus.NOT_FOUND).json({ message: '  toolsandtackles id not found' });
    } else {
        res.status(httpStatus.OK).send('toolsandtackles id  deleted successfully');
    }
});

//update
const updatetoolsandtackles = catchAsync(async (req, res) => {
    const toolsandtackles = await toolsandtacklesServic.updatetoolsandtacklesById(req.params.masterId, req.body);

    if (!toolsandtackles) {
        return res.status(httpStatus.NOT_FOUND).json({ message: ' not found' });
    }
    
    res.send(toolsandtackles);
});



const alldescription = catchAsync(async (req, res) => {

    const filter={}
    const alldescriptions = await toolsandtacklesServic.descriptionall(filter);
    res.send({Description:alldescriptions});
  });
  

module.exports = { Creattoolsandtackles, getalltoolsandtackles, 
    gettoolsandtackles, deletetoolsandtackles, updatetoolsandtackles,alldescription }