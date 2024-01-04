

const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const projectrequirement = require('../../controllers/projectrequirement.controller');

const router = express.Router();




router.route('/')
    
    .get(auth('getCodes'),projectrequirement.projectrequirement )

    
    module.exports = router;