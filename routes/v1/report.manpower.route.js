const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const report = require('../../controllers/report.manpower.controller');

const router = express.Router();

router.route('/')
.get(auth('getCodes'), report.getManpower)







    module.exports=router;