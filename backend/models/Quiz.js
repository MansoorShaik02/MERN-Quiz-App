const mongoose = require('mongoose');
const QuestionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ text: { type: String, required: true }, isCorrect: { type: Boolean, required: true } }],
});
const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    questions: [QuestionSchema],
});
module.exports = mongoose.model('Quiz', QuizSchema);
