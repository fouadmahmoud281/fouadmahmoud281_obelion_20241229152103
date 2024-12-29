const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login/google', authController.googleLogin);
router.post('/login/facebook', authController.facebookLogin);
router.post('/login/email', authController.emailLogin);
router.post('/register', authController.register);

module.exports = router;
