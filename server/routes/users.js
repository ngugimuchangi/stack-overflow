const { Router } = require('express');
const controller = require('../controllers/users');
const authorize = require('../middlewares/auth');

const router = Router();

router.get('/', authorize, controller.getUser);
router.get('/:userId', authorize, controller.getUser);
router.post('', controller.createUser);
router.delete('/:userId', authorize, controller.deleteUser);

module.exports = router;
