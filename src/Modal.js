import React from "react";
import { useGlobalContext } from "./context";

const Modal = () => {
  const {
    handleCloseModal,
    questions,
    correct,
    isModalOpen,
  } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content">
        <h2>Congrats!</h2>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}%
          correctly of the questions
        </p>
        <button onClick={handleCloseModal} className="close-btn">
          Play Again
        </button>
      </div>
    </div>
  );
};

export default Modal;
