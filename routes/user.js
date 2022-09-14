const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//register route to create new user
router.post('/register', authController.user_register);

//login route to generate token
router.post('/login', authController.user_login);

module.exports = router;