const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//login route to generate token
router.post('/login', authController.user_login);

module.exports = router;