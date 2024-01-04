
const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const dailyoperational = require('../../controllers/dailyoperationaldata.controller');

const router = express.Router();

router.route('/')
    .post(auth('manageMasters'), dailyoperational.createDailyoperationldata)
    .get(auth('getCodes'), dailyoperational.getallDailyoperationldata)

router
    .route('/:masterId')
    .get(auth('getCodes'), dailyoperational.getDailyoperationldata)

    .patch(auth('getAccess'),  dailyoperational.updateDailyoperationldata)
    .delete(auth('getAccess'), dailyoperational.deleteDailyoperationldata)





    module.exports=router;