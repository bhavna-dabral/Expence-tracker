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

  // Safe filtering of income transactions
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
            <option value="" disabled>
              Select Category
            </option>
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
    background: rgba(255, 255, 255, 0.7);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05);

    .error {
      color: var(--color-delete);
      font-weight: 600;
      text-align: center;
    }

    .input-control {
      width: 100%;

      input,
      textarea,
      select {
        width: 100%;
        font-family: inherit;
        font-size: 0.95rem;
        padding: 0.65rem 0.9rem;
        border-radius: 10px;
        border: 2px solid #fff;
        outline: none;
        background: #fcf6f9;
        color: rgba(34, 34, 96, 0.9);
        box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
        transition: all 0.3s ease;

        &:focus {
          border-color: var(--color-accent);
          box-shadow: 0px 0px 6px rgba(245, 102, 146, 0.3);
        }
        &::placeholder {
          color: rgba(34, 34, 96, 0.4);
        }
      }
    }

    .submit-btn {
      display: flex;
      justify-content: center;
      button {
        width: 100%;
      }
    }
  }

  .history-section {
    background: #fcf6f9;
    border-radius: 15px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h2 {
      margin-bottom: 0.5rem;
    }

    .no-data {
      text-align: center;
      color: #888;
      font-style: italic;
    }

    .history-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.05);

      .left {
        display: flex;
        flex-direction: column;
      }

      .right {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
      }

      .amount {
        font-weight: bold;
        color: green;
      }

      .date {
        font-size: 0.75rem;
        color: #555;
      }
    }
  }

  @media (max-width: 600px) {
    form {
      padding: 1rem;
      gap: 0.8rem;
    }

    .history-section {
      padding: 0.75rem;
    }

    .history-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .history-item .right {
      align-items: flex-start;
    }
  }
`;

export default IncomeFormWithHistory;
