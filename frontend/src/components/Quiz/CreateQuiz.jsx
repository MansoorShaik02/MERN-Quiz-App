import { useState } from "react";
import { createQuiz } from "../../api";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([
    { question: "", options: ["", "", "", ""], correctIndex: 0 },
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      title,
      questions: questions.map((q) => ({
        question: q.question,
        options: q.options.map((opt, i) => ({
          text: opt,
          isCorrect: i === q.correctIndex,
        })),
      })),
    };
    try {
      await createQuiz(quizData);
      setTitle("");
      setQuestions([
        { question: "", options: ["", "", "", ""], correctIndex: 0 },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", "", ""], correctIndex: 0 },
    ]);
  };

  const updateQuestion = (index, key, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [key]: value } : q
    );
    setQuestions(updatedQuestions);
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === qIndex
        ? {
            ...q,
            options: q.options.map((opt, j) => (j === oIndex ? value : opt)),
          }
        : q
    );
    setQuestions(updatedQuestions);
  };

  const updateCorrectIndex = (qIndex, value) => {
    const updatedQuestions = questions.map((q, i) =>
      i === qIndex ? { ...q, correctIndex: value } : q
    );
    setQuestions(updatedQuestions);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl mb-4">Create Quiz</h2>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4">
            <label className="block text-sm font-bold mb-2">
              Question {qIndex + 1}
            </label>
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                updateQuestion(qIndex, "question", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="mt-2">
                <input
                  type="radio"
                  name={`correctIndex-${qIndex}`}
                  checked={q.correctIndex === oIndex}
                  onChange={() => updateCorrectIndex(qIndex, oIndex)}
                />
                <input
                  type="text"
                  value={opt}
                  onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                  className="ml-2 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            ))}
          </div>
        ))}
        <button
          type="button"
          onClick={addQuestion}
          className="w-full bg-gray-500 text-white p-2 rounded mb-4"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
