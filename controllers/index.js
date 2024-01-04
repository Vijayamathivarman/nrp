module.exports.authController = require('./auth.controller');
module.exports.userController = require('./user.controller');
module.exports.projectMasterController=require('./projectmaster.controller');
module.exports.projetCodeController=require('./projectcode.controller');
// module.exports.projetAccessController=require('./projectaccess.controller');
module.exports.projectTeamController =require('./projectteam.controller');

//projectrequirement

module.exports.consumablesController=require('./consumables.controller');
module.exports.machineryController=require('./machinery.controller');
module.exports.manpowerController=require('./manpower.controller');
module.exports.toolsandtacklesController=require('./toolsandtackles.controller');
module.exports.instrumentaController=require('./instrument.controller');
module.exports.saftytoolsControll=require('./saftytools.controller');
//dailyreportdata
module.exports.dailyoprerationaldataController=require('./dailyoperationaldata.controller');


//report
module.exports.reportController=require('./report.manpower.controller');
module.exports.consumablesreportController=require('./report.consumable.controller');
module.exports.machineryreportController=require("./reportmachinery.controller");
module.exports.toolsandtacklesreportController=require("./report.toolsandtackles.controller");
module.exports.instrumentsreportController=require("./report.instruments.controller");
module.exports.saftytoolsreportController=require("./report.saftytools.controller");


//dashboard


module.exports.dashboardController=require('./dashboard.controller');


//projectrequirement

module.exports.projectrequirementController=('./projectrequirementController')


//dashboardreport

module.exports.reportdashboardcontroller=require('./reportdashboard.controller')