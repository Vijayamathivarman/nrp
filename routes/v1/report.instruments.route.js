const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const instrumentsreport = require('../../controllers/report.instruments.controller');

const router = express.Router();

router.route('/')
.get(auth('getCodes'),instrumentsreport.getinstruments)







 module.exports=router;