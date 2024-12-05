import { useEffect, useState } from "react";
import { getQuizzes } from "../../api";
import { Link } from "react-router-dom";

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl mb-4">Quizzes</h1>
      <ul className="space-y-4">
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="bg-white p-4 rounded shadow">
            <Link to={`/quizzes/${quiz._id}`} className="text-blue-500">
              {quiz.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuizList;
