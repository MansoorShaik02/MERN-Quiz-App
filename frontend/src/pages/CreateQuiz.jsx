import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { createQuiz } from "../api";
import { AuthContext } from "../context/AuthContext";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([
    {
      question: "",
      options: [
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
        { text: "", isCorrect: false },
      ],
      correctOption: null,
    },
  ]);
  const { user } = useContext(AuthContext);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex].text = value;
    setQuestions(newQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].correctOption = value;
    newQuestions[questionIndex].options.forEach((option, index) => {
      option.isCorrect = index === parseInt(value);
    });
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: [
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
          { text: "", isCorrect: false },
        ],
        correctOption: null,
      },
    ]);
  };

  const handleRemoveQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const quizData = { title, description, questions };
      console.log("Sending quiz data:", quizData);
      await createQuiz(quizData);
      alert("Quiz created successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error creating quiz:", error);
    }
  };

  if (!user) {
    return <p>You need to be logged in to create a quiz.</p>;
  }

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
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        {questions.map((q, questionIndex) => (
          <div key={questionIndex} className="mb-4">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-bold mb-2">
                Question {questionIndex + 1}
              </label>
              <button
                type="button"
                onClick={() => handleRemoveQuestion(questionIndex)}
                className="bg-red-500 text-white py-1 px-2 rounded"
              >
                Remove Question
              </button>
            </div>
            <input
              type="text"
              value={q.question}
              onChange={(e) =>
                handleQuestionChange(questionIndex, "question", e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded mb-2"
              required
            />
            {q.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-2">
                <label className="block text-sm font-bold mb-1">
                  Option {optionIndex + 1}
                </label>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(
                      questionIndex,
                      optionIndex,
                      e.target.value
                    )
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            ))}
            <label className="block text-sm font-bold mb-1">
              Correct Answer
            </label>
            <select
              value={q.correctOption || ""}
              onChange={(e) =>
                handleCorrectOptionChange(questionIndex, e.target.value)
              }
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select the correct answer</option>
              {q.options.map((option, index) => (
                <option key={index} value={index}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddQuestion}
          className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
        >
          Add Question
        </button>
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded"
        >
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuiz;
