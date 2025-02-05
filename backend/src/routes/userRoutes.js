const express = require('express');
const router = express.Router();
const { insertUser } = require('../controllers/userController');

router.post('/insert', insertUser);

module.exports = router; 