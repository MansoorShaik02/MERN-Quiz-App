import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import CreateQuiz from "./pages/CreateQuiz";
import Quizzes from "./pages/Quizzes";
import QuizDetail from "./pages/QuizDetail";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/quizzes" element={<Quizzes />} />
        <Route path="/quiz/:id" element={<QuizDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
