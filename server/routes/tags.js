const { Router } = require('express');
const authorize = require('../middlewares/auth');
const controller = require('../controllers/tags');

const router = Router();

router.get('/', controller.getAllTags);
router.get('/me', authorize, controller.getUserTags);
router.delete('/:tagId', authorize, controller.deleteTag);

module.exports = router;
