const { Router } = require('express');
const verify = require('../middlewares/auth');
const controller = require('../controllers/tags');

const router = Router();

router.get('/', controller.getTags);
router.delete('/:tagId', verify, controller.deleteTag);

module.exports = router;
