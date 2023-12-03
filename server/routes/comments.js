const { Router } = require('express');
const controller = require('../controllers/comments');
const authorize = require('../middlewares/auth');

const router = Router({ mergeParams: true });

router.post('/', authorize, controller.createComment);
router.get('/', controller.getComments);
router.patch('/:commentId', authorize, controller.updateComment);
router.delete('/:commentId', authorize, controller.deleteComment);

module.exports = router;
