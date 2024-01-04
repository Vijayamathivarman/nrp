

const express = require('express');
const app = express();
const auth = require('../../middlewares/auth');
const dashboard = require('../../controllers/dashboard.controller');

const router = express.Router();




router.route('/')
    
    .get(auth('getCodes'),dashboard.projectAllcount )

    
    module.exports = router;