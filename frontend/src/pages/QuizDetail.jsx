import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizById, attemptQuiz } from "../api";

const QuizDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuizById(id);
        setQuiz(data);
        setAnswers(
          data.questions.map((question) => ({
            questionId: question._id,
            selectedOption: null,
          }))
        );
      } catch (error) {
        console.error("Error fetching quiz:", error);
      }
    };

    fetchQuiz();
  }, [id]);

  const goToHomePage = () => {
    navigate("/");
  };

  const handleAnswerChange = (qIndex, optionIndex) => {
    const newAnswers = answers.map((answer, i) =>
      i === qIndex ? { ...answer, selectedOption: optionIndex } : answer
    );
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await attemptQuiz(id, { answers });
      setScore(result.score);
      setCorrectAnswers(result.correctAnswers); // Assuming API returns correct answers
      setMessage(`You scored ${result.score} points!`);
    } catch (error) {
      console.error("An error occurred while submitting the quiz:", error);
      setMessage("An error occurred while submitting the quiz.");
    }
  };

  if (!quiz) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-500">
      <form
        onSubmit={handleSubmit}
        className="text-center w-full max-w-lg bg-white p-6 rounded shadow-md"
      >
        <h1 className="text-2xl mb-4">{quiz.title}</h1>
        <p className="mb-4">{quiz.description}</p>
        {quiz.questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-4">
            <h2 className="text-lg mb-2">
              Question {qIndex + 1}: {question.question}
            </h2>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label className="block text-sm mb-1">
                  <input
                    type="radio"
                    name={`question-${qIndex}`}
                    value={option.text}
                    checked={answers[qIndex]?.selectedOption === optionIndex}
                    onChange={() => handleAnswerChange(qIndex, optionIndex)}
                    className="mr-2"
                  />
                  {option.text}
                  {score !== null && (
                    <span
                      className={`ml-2 ${
                        question.correctOption === optionIndex
                          ? "text-green-500"
                          : answers[qIndex]?.selectedOption === optionIndex
                          ? "text-red-500"
                          : ""
                      }`}
                    >
                      {question.correctOption === optionIndex
                        ? " (Correct)"
                        : answers[qIndex]?.selectedOption === optionIndex
                        ? " (Your choice)"
                        : ""}
                    </span>
                  )}
                </label>
              </div>
            ))}
            {score !== null && (
              <p className="mt-2 text-green-500">
                Correct answer: {question.options[question.correctOption].text}
              </p>
            )}
          </div>
        ))}
        {score === null ? (
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded w-full"
          >
            Submit Quiz
          </button>
        ) : (
          <>
            <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
              {message}
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded w-full mt-3"
              onClick={goToHomePage}
            >
              Home Page
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default QuizDetail;
