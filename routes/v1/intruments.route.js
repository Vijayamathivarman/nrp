const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const instrument = require('../../controllers/instrument.controller');

const router = express.Router();



router.route('/description')
 .get(auth('getCodes'),instrument.alldescription)

router.route('/')
    .post(auth('manageMasters'), instrument.CreatIntruments)
    .get(auth('getCodes'), instrument.getallIntruments)

router
    .route('/:masterId')
    .get(auth('getCodes'), instrument.getIntruments)

    .delete(auth('getAccess'), instrument.deleteIntruments)
    .patch(auth('getAccess'), instrument.updateIntruments)


module.exports = router;