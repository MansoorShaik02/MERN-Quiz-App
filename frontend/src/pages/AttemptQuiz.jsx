import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuiz, attemptQuiz } from "../api";

const AttemptQuiz = () => {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await getQuiz(id);
        setQuiz(data);
        setAnswers(new Array(data.questions.length).fill(null));
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleAnswerChange = (qIndex, optionIndex) => {
    const newAnswers = answers.map((answer, i) =>
      i === qIndex ? optionIndex : answer
    );
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    console.log("first handlesubmit error");

    e.preventDefault();
    console.log("first handlesubmit error");
    try {
      await attemptQuiz(id, { answers });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center">
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
                  checked={answers[qIndex] === oIndex}
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
          Submit quiz
        </button>
      </form>
    </div>
  );
};

export default AttemptQuiz;
