

const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const consumabledescripion = require('../../controllers/consumables.controller');
const toolsandtacklesdescripion = require('../../controllers/toolsandtackles.controller');
const instrumentdescripion = require('../../controllers/instrument.controller');    

const SaftyToolsdescripion= require('../../controllers/instrument.controller');              
const router = express.Router();

router.route('/SaftyTools')
 .get(auth('getCodes'),SaftyToolsdescripion.alldescription)

router.route('/insdec')
 .get(auth('getCodes'),instrumentdescripion.alldescription)

router.route('/all')
 .get(auth('getCodes'),consumabledescripion.alldescription)
 //
 router.route('/')
 .get(auth('getCodes'),toolsandtacklesdescripion.alldescription)

module.exports = router;