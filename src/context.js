import axios from "axios";
import React, { useState, useContext, useEffect } from "react";

const table = {
  history: 23,
  politics: 24,
  sports: 21,
  Art: 25,
  Computers: 18,
};

const API_ENDPOINT = "https://opentdb.com/api.php?";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [correct, setCorrect] = useState(0);
  const [error, setError] = useState(false);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: "sport",
    difficulty: "easy",
  });

  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);
    const response = await axios(url).catch((err) => console.log(err));
    console.log(response);
    if (response) {
      const data = response.data.results;
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        setWaiting(true);
        setError(true);
      }
    } else {
      setWaiting(true);
    }
  };

  const handleNextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        handleOpenModal();
        return 0;
      } else {
        return index;
      }
    });
  };

  const handleCheckAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1);
    }
    handleNextQuestion();
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({ ...quiz, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, difficulty, category } = quiz;
    const Url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;

    fetchQuestions(Url);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        waiting,
        questions,
        correct,
        error,
        index,
        isModalOpen,
        quiz,
        handleNextQuestion,
        handleCheckAnswer,
        handleOpenModal,
        handleCloseModal,
        handleChange,
        handleSubmit,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
