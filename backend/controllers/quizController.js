const Quiz = require('../models/Quiz');

const createQuiz = async (req, res) => {
    const { title, description, questions } = req.body;

    try {
        const quiz = new Quiz({
            title,
            description,
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
    const { id } = req.params;
    const { answers } = req.body;

    try {
        const quiz = await Quiz.findById(id);

        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        let score = 0;

        answers.forEach(answer => {
            const question = quiz.questions.id(answer.questionId);
            if (question) {
                const correctOption = question.options.findIndex(option => option.isCorrect);
                if (correctOption === answer.selectedOption) {
                    score += 1;
                }
            }
        });

        const attempt = {
            user: req.user._id,
            answers,
            score
        };

        quiz.attempts.push(attempt);
        await quiz.save();

        res.status(201).json({ score, message: 'Quiz attempted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    createQuiz,
    getQuizzes,
    getQuiz,
    attemptQuiz,
};
