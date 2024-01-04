const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const toolandtacklesreport = require('../../controllers/report.toolsandtackles.controller');

const router = express.Router();

router.route('/')
.get(auth('getCodes'),toolandtacklesreport.gettoolsandtackles)







 module.exports=router;