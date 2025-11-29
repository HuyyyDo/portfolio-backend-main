
// const router = require('express').Router();
// const c = require('../controllers/service.controller');

// router.get('/', c.getAll);
// router.get('/:id', c.getById);
// router.post('/', c.create);
// router.put('/:id', c.updateById);
// router.delete('/:id', c.removeById);
// router.delete('/', c.removeAll);

// module.exports = router;

// src/routes/project.routes.js
const router = require('express').Router();
const c = require('../controllers/project.controller');
const auth = require('../middleware/auth'); // auth middleware to protect routes

// Public routes (anyone can view)
router.get('/', c.getAll);
router.get('/:id', c.getById);

// Protected routes (requires valid token)
router.post('/', auth, c.create);
router.put('/:id', auth, c.updateById);
router.delete('/:id', auth, c.removeById);
router.delete('/', auth, c.removeAll);

module.exports = router;
