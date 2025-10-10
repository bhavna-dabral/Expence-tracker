import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function Form() {
  const { addIncome, error, setError } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: null,
    category: "",
    description: ""
  });

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputState.title || !inputState.amount || !inputState.date || !inputState.category) {
      setError("Please fill in all required fields.");
      return;
    }
    addIncome(inputState);
    setInputState({ title: "", amount: "", date: null, category: "", description: "" });
  };

  return (
    <FormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      <div className="input-control">
        <input
          type="text"
          value={inputState.title}
          placeholder="Income Title"
          onChange={handleInput("title")}
        />
      </div>
      <div className="input-control">
        <input
          type="number"
          value={inputState.amount}
          placeholder="Income Amount"
          onChange={handleInput("amount")}
          min="0"
        />
      </div>
      <div className="input-control">
        <DatePicker
          placeholderText="Select a Date"
          selected={inputState.date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, date })}
        />
      </div>
      <div className="input-control">
        <select value={inputState.category} onChange={handleInput("category")}>
          <option value="">Select Category</option>
          <option value="salary">Salary</option>
          <option value="freelancing">Freelancing</option>
          <option value="investments">Investments</option>
          <option value="stocks">Stocks</option>
          <option value="bitcoin">Bitcoin</option>
          <option value="bank">Bank Transfer</option>
          <option value="youtube">YouTube</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="input-control">
        <textarea
          value={inputState.description}
          placeholder="Add a reference or note"
          onChange={handleInput("description")}
        />
      </div>
      <div className="submit-btn">
        <Button name="Add Income" icon={plus} type="submit" />
      </div>
    </FormStyled>
  );
}

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  input, textarea, select {
    padding: 0.7rem 1rem;
    border-radius: 10px;
    border: 2px solid #fff;
  }
  .submit-btn { display: flex; justify-content: flex-end; }
  .error { color: red; text-align: center; font-weight: 600; }
`;

export default Form;
