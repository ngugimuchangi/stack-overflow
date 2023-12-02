const { Router } = require('express');
const verify = require('../middlewares/auth');
const controller = require('../controllers/questions');
const answerRouter = require('./answers');

const router = Router({ mergeParams: true });

router.use('/:questionId/answers', answerRouter);

router.get('/', controller.getQuestions);
router.get('/:questionId', controller.getQuestions);
router.post('/', verify, controller.createQuestion);
router.put('/:questionId', verify, controller.updateQuestion);
router.patch('/:questionId/vote', verify, controller.voteQuestion);
router.delete('/:questionId', verify, controller.deleteQuestion);

module.exports = router;
