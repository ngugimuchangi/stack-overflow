const { Router } = require('express');
const controller = require('../controllers/auth');
const authorize = require('../middlewares/auth');
const router = Router();

router.post('/login', controller.login);
router.get('/logout', authorize, controller.logout);

module.exports = router;
