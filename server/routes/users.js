const { Router } = require('express');
const userController = require('../controllers/users');
const authorize = require('../middlewares/auth');

const router = Router('/users');

router.get('', authorize, userController.getUser);
router.post('', userController.createUser);
userController.delete('', authorize, userController.deleteUser);
