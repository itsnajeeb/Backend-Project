const express = require('express');
const { signup, login,profile } = require('../controller/authController');
const authMiddleware = require('../middleware/authMiddleware')
const authRouther = express.Router();

authRouther.post('/signup', authMiddleware.signupValidator, signup)
authRouther.post('/login', authMiddleware.loginValidator, login)
authRouther.post('/profile', authMiddleware.authenticateUser, profile)

module.exports = authRouther
