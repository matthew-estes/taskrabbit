const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/tasks');


router.get('/', taskCtrl.index);


module.exports = router;