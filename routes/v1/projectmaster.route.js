const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const projectmaster = require('../../controllers/projectmaster.controller');

const router = express.Router();

app.use(express.json());
router.route('/')
    //CREATE
    .post(auth('manageMasters'), projectmaster.createProjectMaster)

    // VIEW
    .get(auth('getMasters'), projectmaster.getProjectMasters)
// VIEW without pagination
router.route('/getallmasters')
    .get(auth('getMasters'), projectmaster.getProjectMasterswithoutpgn)
router
    .route('/:masterId')
    //SHOW
    .get(auth('manageMasters'), projectmaster.getProjectMaster)
    //UPDATE
    .patch(auth('manageMasters'), projectmaster.updateprojectMaster)
    //DELETE
    .delete(auth('manageMasters'), projectmaster.deleteprojectMaster)


// GET MASTER
router.route('/masters')
    .get(auth('getAllMasters'), projectmaster.getAllProjectMasters)






module.exports = router;