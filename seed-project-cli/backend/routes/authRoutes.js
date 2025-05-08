const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { register, login, logout } = require('../controllers/authController');

// Registro
router.post('/register', register);

// Login
router.post('/login', login);

// Logout
router.post('/logout', logout);

module.exports = router;

