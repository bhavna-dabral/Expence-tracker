import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseFormWithHistory() {
  const { addExpense, error, setError, transactions = [] } = useGlobalContext();
  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: null,
    category: '',
    description: '',
  });
  const [showHistory, setShowHistory] = useState(false);

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !amount || !date || !category) {
      setError('Please fill in all required fields.');
      return;
    }
    addExpense(inputState);
    setInputState({
      title: '',
      amount: '',
      date: null,
      category: '',
      description: '',
    });
  };

  const expenseHistory = transactions.filter(t => t.type === 'expense');

  return (
    <FormHistoryStyled>
      <form onSubmit={handleSubmit}>
        {error && <p className="error">{error}</p>}

        <div className="input-control">
          <input
            type="text"
            value={title}
            placeholder="Expense Title"
            onChange={handleInput('title')}
          />
        </div>

        <div className="input-control">
          <input
            type="number"
            value={amount}
            placeholder="Expense Amount"
            min="0"
            onChange={handleInput('amount')}
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
          <select value={category} onChange={handleInput('category')} required>
            <option value="" disabled>Select Category</option>
            <option value="education">Education</option>
            <option value="groceries">Groceries</option>
            <option value="health">Health</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="takeaways">Takeaways</option>
            <option value="clothing">Clothing</option>
            <option value="travelling">Travelling</option>
            <option value="food">Food</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="input-control">
          <textarea
            value={description}
            placeholder="Add a reference or note"
            onChange={handleInput('description')}
            rows="4"
          />
        </div>

        <div className="submit-btn">
          <Button
            name="Add Expense"
            icon={plus}
            bPad=".8rem 1.6rem"
            bRad="30px"
            bg="var(--color-accent)"
            color="#fff"
            type="submit"
          />
        </div>

        {/* Toggle history button only for mobile */}
        <button
          type="button"
          className="toggle-history-btn"
          onClick={() => setShowHistory(!showHistory)}
        >
          {showHistory ? 'Hide Expense History' : 'Show Expense History'}
        </button>
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
    background: rgba(255,255,255,0.8);
    border-radius: 20px;
    padding: 1.5rem;
    box-shadow: 0px 1px 15px rgba(0,0,0,0.05);

    .error {
      color: var(--color-delete);
      font-weight: 600;
      text-align: center;
    }

    .input-control {
      width: 100%;

      input, textarea, select {
        width: 100%;
        font-family: inherit;
        font-size: 0.95rem;
        padding: 0.65rem 0.9rem;
        border-radius: 10px;
        border: 2px solid #fff;
        outline: none;
        background: #fcf6f9;
        color: rgba(34,34,96,0.9);
        box-shadow: 0px 1px 10px rgba(0,0,0,0.05);
        transition: all 0.3s ease;

        &:focus { border-color: var(--color-accent); box-shadow: 0px 0px 6px rgba(245,102,146,0.3);}
        &::placeholder { color: rgba(34,34,96,0.4);}
      }
    }

    .submit-btn {
      display: flex;
      justify-content: center;
      button { width: 100%; }
    }

    .toggle-history-btn {
      display: none;
      margin-top: 0.5rem;
      padding: 0.6rem;
      font-size: 0.9rem;
      border-radius: 15px;
      border: 2px solid var(--color-accent);
      background: #fff;
      color: var(--color-accent);
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: var(--color-accent);
        color: #fff;
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

    h2 { margin-bottom: 0.5rem; }

    .no-data { text-align: center; color: #888; font-style: italic; }

    .history-list {
      max-height: 250px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .history-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem;
      border-radius: 10px;
      background: #fff;
      box-shadow: 0px 1px 5px rgba(0,0,0,0.05);

      .left { display: flex; flex-direction: column; }
      .right { display: flex; flex-direction: column; align-items: flex-end; }

      .amount { font-weight: bold; color: red; }
      .date { font-size: 0.75rem; color: #555; }
    }
  }

  /* Mobile adjustments */
  @media (max-width: 600px) {
    form { padding: 1rem; gap: 0.8rem; }
    .toggle-history-btn { display: block; }

    .history-section { padding: 0.75rem; }
    .history-list { max-height: 200px; }
    .history-item { flex-direction: column; align-items: flex-start; gap: 0.25rem; }
    .history-item .right { align-items: flex-start; }
  }
`;

export default ExpenseFormWithHistory;
