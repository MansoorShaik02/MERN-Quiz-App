const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
    const { title, questions } = req.body;

    try {
        const quiz = new Quiz({
            title,
            questions,
            user: req.user._id,
        });

        await quiz.save();
        res.status(201).json(quiz);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getQuizzes = async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }
        res.json(quiz);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const attemptQuiz = async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        res.json({ message: 'Quiz attempted', correctAnswers: 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    attemptQuiz,
};
