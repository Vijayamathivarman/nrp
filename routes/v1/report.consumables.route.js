const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const cunsumablesreport = require('../../controllers/report.consumable.controller');

const router = express.Router();

router.route('/')
.get(auth('getCodes'), cunsumablesreport.getconsumable)







 module.exports=router;