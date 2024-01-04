const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const saftytoolsreport = require('../../controllers/report.saftytools.controller');

const router = express.Router();

router.route('/')
.get(auth('getCodes'),saftytoolsreport.getsaftytools)







 module.exports=router;