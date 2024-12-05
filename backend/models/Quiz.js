// const mongoose = require('mongoose');



// const questionSchema = new mongoose.Schema({
//     question: { type: String, required: true },
//     options: [optionSchema]
// });

// const attemptSchema = new mongoose.Schema({
//     user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     answers: [
//         {
//             questionId: mongoose.Schema.Types.ObjectId,
//             selectedOption: Number
//         }
//     ],
//     score: { type: Number, default: 0 }
// });

// const quizSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     questions: [questionSchema],
//     attempts: [attemptSchema]
// });

// module.exports = mongoose.model('Quiz', quizSchema);

// const optionSchema = new mongoose.Schema({
//     text: { type: String, required: true }
// });

const mongoose = require('mongoose');
const optionSchema = new mongoose.Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});

const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [optionSchema],
    correctOption: { type: Number, required: true }
});

const attemptSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    answers: [
        {
            questionId: mongoose.Schema.Types.ObjectId,
            selectedOption: Number
        }
    ],
    score: { type: Number, default: 0 }
});

const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    questions: [questionSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attempts: [attemptSchema]

}, {
    timestamps: true
});





const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
