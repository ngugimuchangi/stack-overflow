const { Router } = require('express');
const controller = require('../controllers/comments');

const router = Router({ mergeParams: true });

router.post('/', controller.createComment);
router.get('/', controller.getComments);
router.patch('/:commentId', controller.updateComment);
router.patch('/:commentId/vote', controller.voteComment);
router.delete('/:commentId', controller.deleteComment);

module.exports = router;
