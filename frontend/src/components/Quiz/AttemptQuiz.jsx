import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuiz, attemptQuiz } from "../api";

const AttemptQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuiz(id);
        setQuiz(data);
        setAnswers(
          data.questions.map((question) => ({
            questionId: question._id,
            selectedOption: null,
          }))
        );
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (qIndex, optionIndex) => {
    const newAnswers = answers.map((answer, i) =>
      i === qIndex ? { ...answer, selectedOption: optionIndex } : answer
    );
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    console.log("sent quiz");
    e.preventDefault();
    try {
      const result = await attemptQuiz(id, { answers });
      setScore(result.score);
      setMessage(`You scored ${result.score} points!`);
      setTimeout(() => navigate("/"), 5000); // Redirect after 5 seconds
    } catch (error) {
      console.error(error);
      setMessage("An error occurred while submitting the quiz.");
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-lg"
      >
        <h2 className="text-2xl mb-4">{quiz.title}</h2>
        {quiz.questions.map((q, qIndex) => (
          <div key={qIndex} className="mb-4">
            <p className="font-bold mb-2">{q.question}</p>
            {q.options.map((opt, oIndex) => (
              <div key={oIndex} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={`answer-${qIndex}`}
                  checked={answers[qIndex]?.selectedOption === oIndex}
                  onChange={() => handleAnswerChange(qIndex, oIndex)}
                />
                <label className="ml-2">{opt.text}</label>
              </div>
            ))}
          </div>
        ))}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          Submit
        </button>
        {message && (
          <div className="mt-4 p-2 bg-green-200 text-green-800 rounded">
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default AttemptQuiz;
