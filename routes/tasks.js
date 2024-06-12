const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/tasks');


router.get('/', taskCtrl.index);
router.get('/new', taskCtrl.new);
router.post('/', taskCtrl.create);


module.exports = router;