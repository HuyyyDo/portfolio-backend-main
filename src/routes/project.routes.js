
const router = require('express').Router();
const c = require('../controllers/project.controller');

router.get('/', c.getAll);
router.get('/:id', c.getById);
router.post('/', c.create);
router.put('/:id', c.updateById);
router.delete('/:id', c.removeById);
router.delete('/', c.removeAll);

module.exports = router;
