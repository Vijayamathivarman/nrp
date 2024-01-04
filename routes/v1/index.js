const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const config = require('../../config/config');

//setting
const projectmaster = require('./projectmaster.route');
const projectcode = require('./projectcode.route');
const projectteam = require('./projectteam.route');

//project requirement
const consumables = require('./consumables.route')
const machinery = require('./machinery.route')
const manpower = require('./manpower.route')
const toolsAndtackles = require('./toolsandtackles.route')
const intruments=require('./intruments.route')
const saftytools=require('./saftytools.route')

//dailyoperationaldata
const dailyoperational=require('./dailyoperationaldata.route')


// reports
const manpowerreport=require('./report.manpower.route')
const cunsumablesreport=require('./report.consumables.route')
const machineryreport=require('./report.machinery.route')
const toolandtacklesreport=require('./report.toolsandtackles.route')
const instrumentsreport=require('./report.instruments.route')
const saftytoolsreport=require('./report.saftytools.route')


//dashboard
const dashboard=require('./dashboard.route')

const projectrequirement=require('./projectrequirement.route')



//reportdashboard
const reportdashboard=require('./reportdashboard.route')


//description
const consumabledescripion = require('./dropdown.route')
const toolsandtacklesdescripion = require('./dropdown.route')
const instrumentdescripion = require('./dropdown.route')
const SaftyToolsdescripion = require('./dropdown.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/projectMaster',
    route: projectmaster,
  },
  {
    path: '/projectCode',
    route: projectcode,
  },
  {
    path: '/projectTeam',
    route: projectteam,
  },


  {
    path: '/consumables',
    route: consumables,
  },
  {
    path: '/machinery',
    route: machinery,
  },

  {
    path: '/manpower',
    route: manpower,
  },
  {
    path: '/toolsandtackles',
    route: toolsAndtackles,
  },
  {
    path: '/intruments',
    route: intruments,
  },
  {
    path: '/saftytools',
    route: saftytools,
  },

  {
    path:'/dailyoperational',
    route: dailyoperational,
  },
  
              //reports
  {
    path:'/manpowerreport',
    route: manpowerreport,
  },
  {
    path:'/cunsumablesreport',
    route: cunsumablesreport,
  },
  {
    path:'/machineryreport',
    route: machineryreport,
  },
  
  {
    path:'/toolandtacklesreport',
    route: toolandtacklesreport,
  },
  {
    path:'/instrumentsreport',
    route: instrumentsreport,
  },
  {
    path:'/saftytoolsreport',
    route: saftytoolsreport,
  },

// dasgboard

{
  path:'/dashboard',
  route: dashboard,
},

{
  path:'/projectrequirement',
  route: projectrequirement,
},

//reportdashboead
{
  path:'/reportdashboard',
  route: reportdashboard,
},


//description
{
  path: '/SaftyToolsdescripion',
  route: SaftyToolsdescripion,
},
{
  path: '/consumabledescripion',
  route: consumabledescripion,
},
{
  path: '/instrumentdescripion',
  route: instrumentdescripion,
},
{
  path: '/toolsandtacklesdescripion',
  route: toolsandtacklesdescripion,
},

];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
