const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const machineryreport = require('../../controllers/reportmachinery.controller');

const router = express.Router();

router.route('/')
.get(auth('getCodes'), machineryreport.getmachinery)







 module.exports=router;