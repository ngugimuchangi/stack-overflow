const { Router } = require('express');
const authorize = require('../middlewares/auth');
const controller = require('../controllers/questions');
const answerRouter = require('./answers');

const router = Router({ mergeParams: true });

router.use('/:questionId/answers', answerRouter);

router.get('', controller.getQuestions);
router.get('/me', authorize, controller.getQuestionsForCurrentUser);
router.get('/:questionId', controller.getQuestions);
router.post('/', controller.createQuestion);
router.patch('/:questionId', controller.updateQuestion);
router.delete('/:questionId', authorize, controller.deleteQuestion);

module.exports = router;
