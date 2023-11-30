const { Router } = require('express');
const verify = require('../middlewares/auth');
const controller = require('../controllers/questions');
const router = Router();

router.get('/', controller.getQuestion);
router.get('/:id', controller.getQuestion);
router.get('/:id/answers', controller.getAnswers);
router.post('/', verify, controller.createQuestion);
router.put('/:id', verify, controller.updateQuestion);
router.post('/:id/vote', verify, controller.voteQuestion);
router.delete('/:id', verify, controller.deleteQuestion);

module.exports = router;
