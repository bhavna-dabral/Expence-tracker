import React, { useState } from "react";
import styled from "styled-components";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGlobalContext } from "../../context/globalContext";
import Button from "../Button/Button";
import { plus } from "../../utils/Icons";

function IncomeFormWithHistory() {
  const { addIncome, error, setError, transactions = [] } = useGlobalContext();

  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: null,
    category: "",
    description: "",
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date || !category) {
      setError("Please fill in all required fields.");
      return;
    }
    addIncome(inputState);
    setInputState({
      title: "",
      amount: "",
      date: null,
      category: "",
      description: "",
    });
  };

  // ✅ Now USED (fixes no-unused-vars error)
  const incomeTransactions = transactions.filter((t) => t?.type === "income");

  return (
    <FormHistoryStyled>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <div className="input-control">
          <input
            type="text"
            value={title}
            placeholder="Income Title"
            onChange={handleInput("title")}
          />
        </div>

        <div className="input-control">
          <input
            type="number"
            value={amount}
            placeholder="Income Amount"
            min="0"
            onChange={handleInput("amount")}
          />
        </div>

        <div className="input-control date-picker">
          <DatePicker
            placeholderText="Select a date"
            selected={date}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setInputState({ ...inputState, date })}
          />
        </div>

        <div className="input-control">
          <select value={category} onChange={handleInput("category")} required>
            <option value="" disabled>Select Category</option>
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
            value={description}
            placeholder="Add a reference or note"
            onChange={handleInput("description")}
            rows="4"
          />
        </div>

        <div className="submit-btn">
          <Button
            name="Add Income"
            icon={plus}
            bPad=".8rem 1.6rem"
            bRad="30px"
            bg="var(--color-accent)"
            color="#fff"
            type="submit"
          />
        </div>
      </form>

      {/* ✅ Income History UI */}
      <div className="history-section">
        <h2>Income History</h2>
        {incomeTransactions.length === 0 ? (
          <p className="no-data">No income records found.</p>
        ) : (
          incomeTransactions.map((inc) => (
            <div key={inc._id} className="history-item">
              <div className="left">
                <span>{inc.title}</span>
                <span className="date">{new Date(inc.date).toLocaleDateString()}</span>
              </div>
              <div className="right">
                <span className="amount">₹ {inc.amount}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </FormHistoryStyled>
  );
}

const FormHistoryStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(255,255,255,0.7);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.05);
  }

  .error { color: red; font-weight: 600; text-align: center; }

  .history-section {
    background: #fcf6f9;
    border-radius: 15px;
    padding: 1rem;
  }

  .history-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: #fff;
    border-radius: 10px;
    margin-top: 0.5rem;
  }

  .amount { font-weight: bold; color: green; }
  .date { font-size: 0.75rem; color: #555; }
`;

export default IncomeFormWithHistory;
