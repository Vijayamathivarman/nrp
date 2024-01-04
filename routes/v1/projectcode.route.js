const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const projectcode = require('../../controllers/projectcode.controller');

const router = express.Router();

router.route('/')
    .post(auth('manageCodes'), projectcode.createProjectCode)
    
    .get(auth('getCodes'), projectcode.getProjectCodes)

//withoutpagination all record
    router.route('/allprojectcode')
    .get(auth('getCodes'), projectcode.getProjectCodeswithoutpagination);

router.route('/:codeId')
    .get(auth('manageCodes'), projectcode.getProjectCode)
    .patch(auth('manageCodes'), projectcode.updateprojectCode)
    .delete(auth('manageCodes'), projectcode.deleteProjectCode)

module.exports = router;