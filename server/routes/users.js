const { Router } = require('express');
const controller = require('../controllers/users');
const authorize = require('../middlewares/auth');

const router = Router();

router.get('/', authorize, controller.getUser);
router.get('/:id', authorize, controller.getUser);
router.post('', controller.createUser);
router.delete('/:id', authorize, controller.deleteUser);

module.exports = router;
