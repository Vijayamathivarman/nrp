const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const machinery = require('../../controllers/machinery.controller');

const router = express.Router();




router.route('/')
    .post(auth('manageMasters'), machinery.Creatmachinery)
    .get(auth('getCodes'), machinery.getallMachinery)

router
    .route('/:masterId')
    .get(auth('getCodes'), machinery.getMachinery)

    .delete(auth('getAccess'), machinery.deleteMachinery)
    .patch(auth('getAccess'), machinery.updateMachinery)


module.exports = router;