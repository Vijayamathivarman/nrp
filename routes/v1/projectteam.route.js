const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const projectTeamController = require('../../controllers/projectteam.controller');

const router = express.Router();
app.use(express.json());

router.route('/')
  .post(auth('manageMasters'), projectTeamController.createProjectTeam)
  .get(auth('getMasters'), projectTeamController.getallProjectTeam)

router
  .route('/:masterId')
  //SHOW
  .get(auth('manageMasters'), projectTeamController.getProjectTeam)
  //update
  .patch(auth('manageMasters'), projectTeamController.updateprojectTeam)
  //delete                 
  .delete(auth('manageMasters'), projectTeamController.deleteprojectTeam)


module.exports = router;
