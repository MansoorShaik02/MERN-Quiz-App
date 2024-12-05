import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Register user
export const register = async (userData) => {
    try {

        const response = await api.post('/auth/register', userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

// Login user
export const login = async (userData) => {
    try {
        const response = await api.post('/auth/login', userData);
        if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data)); // Save token in localStorage
        }
        return response.data;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

// Create a quiz
export const createQuiz = async (quizData) => {
    try {
        console.log('Sending quiz data:', quizData);

        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }

        const response = await api.post('/quizzes', quizData, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating quiz:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// Get all quizzes
export const getQuizzes = async () => {
    try {
        const response = await api.get('/quizzes');
        return response.data;
    } catch (error) {
        console.error("Error fetching quizzes:", error);
        throw error;
    }
};

// Get specific quiz by ID
export const getQuizById = async (quizId) => {
    try {
        const response = await api.get(`/quizzes/${quizId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching quiz:", error);
        throw error;
    }
};

// Attempt a quiz
export const attemptQuiz = async (quizId, answers) => {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
            throw new Error('User not authenticated');
        }

        const response = await api.post(`/quizzes/${quizId}/attempt`, answers, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error attempting quiz:", error);
        throw error;
    }
};
