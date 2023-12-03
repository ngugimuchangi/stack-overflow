const { Router } = require('express');
const authRouter = require('./auth');
const usersRouter = require('./users');
const questionsRouter = require('./questions');
const tagsRouter = require('./tags');
const router = Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);
router.use('/questions', questionsRouter);
router.use('/tags', tagsRouter);

module.exports = router;
