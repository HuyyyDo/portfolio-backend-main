// const jwt = require('jsonwebtoken');
// const { validationResult } = require('express-validator');
// const User = require('../models/user.model');

// const JWT_SECRET = process.env.JWT_SECRET || 'replace_with_secure_secret';
// const TOKEN_EXPIRES_IN = '7d';

// exports.signup = async (req, res, next) => {
//   try {
//     // Validate input if using express-validator
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

//     const { name, email, password } = req.body;
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(409).json({ message: 'Email already registered' });

//     const user = new User({ name, email, password });
//     await user.save();

//     // Return token on signup (optional)
//     const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
//     res.status(201).json({ token, user: { id: user._id, email: user.email, name: user.name } });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.signin = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: 'Invalid credentials' });

//     const isMatch = await user.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES_IN });
//     res.json({ token, user: { id: user._id, email: user.email, name: user.name } });
//   } catch (err) {
//     next(err);
//   }
// };

// src/controllers/auth.controller.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');

const User = require('../models/user.model'); // adjust path if needed

const JWT_SECRET = process.env.JWT_SECRET || 'replace_this_secret';
const JWT_EXPIRES_IN = '7d';

exports.signup = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!email || !password) return next(createError(400, 'Email and password required'));

    const existing = await User.findOne({ email });
    if (existing) return next(createError(409, 'User already exists'));

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstName, lastName, email, password: hashed
    });

    // optionally don't return password
    res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(createError(400, 'Email and password required'));

    const user = await User.findOne({ email });
    if (!user) return next(createError(401, 'Invalid credentials'));

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return next(createError(401, 'Invalid credentials'));

    const token = jwt.sign(
      { id: user._id.toString(), email: user.email },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      token,
      user: { id: user._id.toString(), email: user.email }
    });
  } catch (err) {
    next(err);
  }
};
