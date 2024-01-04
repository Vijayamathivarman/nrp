const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const toolsAndtackles = require('../../controllers/toolsandtackles.controller');

const router = express.Router();

router.route('/description')
.get(auth('getCodes'),toolsAndtackles.alldescription)



router.route('/')
    .post(auth('manageMasters'), toolsAndtackles.Creattoolsandtackles)

    .get(auth('getCodes'), toolsAndtackles.getalltoolsandtackles)

router
    .route('/:masterId')
    .get(auth('getCodes'), toolsAndtackles.gettoolsandtackles)

    .delete(auth('getAccess'), toolsAndtackles.deletetoolsandtackles)
    .patch(auth('getAccess'), toolsAndtackles.updatetoolsandtackles)


module.exports = router;