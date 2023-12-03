const { Router } = require('express');
const controller = require('../controllers/users');
const authorize = require('../middlewares/auth');

const router = Router();

router.post('', controller.createUser);
router.get('/', authorize, controller.getUsers);
router.get('/me', authorize, controller.getCurrentUser);
router.get('/:userId', authorize, controller.getUsers);
router.delete('/:userId', authorize, controller.deleteUser);

module.exports = router;
