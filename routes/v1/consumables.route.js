

const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const consumables = require('../../controllers/consumables.controller');

const router = express.Router();


router.route('/description')
.get(auth('getCodes'),consumables.alldescription)

router.route('/')
    .post(auth('manageMasters'), consumables.CreateConsumables)
    .get(auth('getCodes'), consumables.getallConsumables)

router
    .route('/:masterId')
    .get(auth('getCodes'), consumables.getConsumable)

    .patch(auth('getAccess'), consumables.updateConsumable)
    .delete(auth('getAccess'), consumables.deleteConsumable)

   


module.exports = router;