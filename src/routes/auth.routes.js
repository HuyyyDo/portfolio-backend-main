// const express = require('express');
// const router = express.Router();
// const { body } = require('express-validator');
// const authController = require('../controllers/auth.controller');

// // POST /api/auth/signup
// router.post('/signup', [
//   body('email').isEmail().withMessage('Valid email required'),
//   body('password').isLength({ min: 6 }).withMessage('Password min length 6')
// ], authController.signup);

// // POST /api/auth/signin
// router.post('/signin', [
//   body('email').isEmail(),
//   body('password').exists()
// ], authController.signin);

// module.exports = router;

// src/routes/auth.routes.js
const router = require('express').Router();
const ctrl = require('../controllers/auth.controller');

router.post('/signup', ctrl.signup);
router.post('/signin', ctrl.signin);

module.exports = router;
