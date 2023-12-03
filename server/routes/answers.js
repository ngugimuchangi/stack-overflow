const { Router } = require('express');
const verify = require('../middlewares/auth');
const controller = require('../controllers/answers');
const commentsRouter = require('./comments');

const router = Router({ mergeParams: true });

router.use('/:answerId/comments', commentsRouter);

router.get('/', controller.getAnswers);
router.post('/', verify, controller.createAnswer);
router.patch('/:answerId', verify, controller.updateAnswer);
router.delete('/:answerId', verify, controller.deleteAnswer);

module.exports = router;
