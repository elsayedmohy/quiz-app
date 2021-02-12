import React from "react";
import { useGlobalContext } from "./context";

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return (
    <main>
      <section className="quiz quiz-small">
        <form className="setup-form">
          <h2>Quiz Setup</h2>
          <div className="form-control">
            <label htmlFor="amount">Number of questions</label>
            <input
              className="form-input"
              type="number"
              min={1}
              max={30}
              id="amount"
              name="amount"
              onChange={handleChange}
              value={quiz.amount}
            />
          </div>

          <div className="form-control">
            <label htmlFor="category">Category</label>
            <select
              onChange={handleChange}
              value={quiz.category}
              name="category"
              id="category"
              className="form-input"
            >
              <option value="history">history</option>
              <option value="politics">politics</option>
              <option value="sports">sports</option>
              <option value="Art">Art</option>
              <option value="Computers">Computers</option>
            </select>
          </div>
          <div className="form-control">
            <label htmlFor="difficulty">difficulty</label>
            <select
              onChange={handleChange}
              value={quiz.difficulty}
              name="difficulty"
              id="difficulty"
              className="form-input"
            >
              <option value="easy">easy</option>
              <option value="medium">medium</option>
              <option value="hard">hard</option>
            </select>
          </div>
          {error && (
            <p className="error">
              can't generate questions, please try different options
            </p>
          )}
          <button onClick={handleSubmit} className="submit-btn">
            Start
          </button>
        </form>
      </section>
    </main>
  );
};

export default SetupForm;
