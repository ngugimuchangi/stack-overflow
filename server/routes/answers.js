const { Router } = require('express');
const verify = require('../middlewares/auth');
const controller = require('../controllers/answers');

const router = Router();

router.post('/', verify, controller.createAnswer);
router.put('/:id', verify, controller.updateAnswer);
router.patch('/:id/vote', verify, controller.voteAnswer);
router.delete('/:id', verify, controller.deleteAnswer);

module.exports = router;
