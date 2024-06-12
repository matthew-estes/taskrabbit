const express = require('express');
const router = express.Router();
const taskCtrl = require('../controllers/tasks');

router.get('/', function(req, res) {
    res.send('hello tasks index route');
})



module.exports = router;