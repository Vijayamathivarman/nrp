const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const saftytools = require('../../controllers/saftytools.controller');

const router = express.Router();

router.route('/SaftyTools')
.get(auth('getCodes'),saftytools.alldescription)



router.route('/')
    .post(auth('manageMasters'), saftytools.CreatSaftyTools)
    .get(auth('getCodes'), saftytools.getallSaftyTools)

router
    .route('/:masterId')
    .get(auth('getCodes'), saftytools.getSaftyTools)

    .delete(auth('getAccess'), saftytools.deleteSaftyTools)
    .patch(auth('getAccess'), saftytools.updateSaftyTools)

   
module.exports = router;