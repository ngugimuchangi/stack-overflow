const { Router } = require('express');
const verify = require('../middlewares/auth');
const controller = require('../controllers/questions');
const router = Router();

router.get('/', controller.getQuestions);
router.get('/:id', controller.getQuestion);
router.post('/', verify, controller.createQuestion);
router.patch('/:id', verify, controller.updateQuestion);
router.delete('/:id', verify, controller.deleteQuestion);

module.exports = router;
