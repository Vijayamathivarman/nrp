const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const manpower = require('../../controllers/manpower.controller');

const router = express.Router();



router.route('/')
    .post(auth('manageMasters'), manpower.CreatManpower)
    .get(auth('getCodes'), manpower.getallManpower)

router
    .route('/:masterId')
    .get(auth('getCodes'), manpower.getManpower)

    .patch(auth('getAccess'), manpower.updateManpower)
    .delete(auth('getAccess'), manpower.deleteManpower)

module.exports = router;