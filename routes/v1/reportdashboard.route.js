

const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const reportdashboard = require('../../controllers/reportdashboard.controller');

const router = express.Router();




router.route('/')
    
    .get(auth('getCodes'),reportdashboard.reportdashboradDatas )

    
    module.exports = router;