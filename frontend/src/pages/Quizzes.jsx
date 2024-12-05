import { useEffect, useState } from "react";
import { getQuizzes } from "../api";
import { Link } from "react-router-dom";

const Quizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error("Error fetching quizzes:", error);
      }
    };

    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl mb-4">Available Quizzes</h1>
        {quizzes.length === 0 ? (
          <p>No quizzes available</p>
        ) : (
          <ul>
            {quizzes.map((quiz) => (
              <li key={quiz._id} className="mb-2">
                <Link
                  to={`/quiz/${quiz._id}`}
                  className="text-blue-500 underline"
                >
                  {quiz.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
