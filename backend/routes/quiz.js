const express = require('express');
const router = express.Router();
const { createQuiz, getQuizzes, getQuiz, attemptQuiz } = require('../controllers/quizController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createQuiz);
router.get('/', getQuizzes);
router.get('/:id', getQuiz);
router.post('/:id/attempt', protect, attemptQuiz);

module.exports = router;
