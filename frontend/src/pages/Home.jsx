import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCreateQuiz = () => {
    navigate("/create-quiz");
  };

  const handleAttemptQuiz = () => {
    navigate("/quizzes");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="text-center">
        {user ? (
          <>
            <h1 className="text-2xl mb-4">Welcome, {user.name}!</h1>
            <p>Status: Logged in</p>
            <div className="mt-4">
              <button
                onClick={handleCreateQuiz}
                className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
              >
                Create Quiz
              </button>
              <button
                onClick={handleAttemptQuiz}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Attempt Quiz
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl mb-4">Welcome to the Quiz App</h1>
            <p>Status: Logged off</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
