import React, { useState } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useGlobalContext } from '../../context/globalContext';
import Button from '../Button/Button';
import { plus } from '../../utils/Icons';

function ExpenseForm() {
  const { addExpense, error, setError } = useGlobalContext();

  const [inputState, setInputState] = useState({
    title: '',
    amount: '',
    date: '',
    category: '',
    description: '',
  });

  const { title, amount, date, category, description } = inputState;

  const handleInput = (name) => (e) => {
    setInputState({ ...inputState, [name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense(inputState);
    setInputState({
      title: '',
      amount: '',
      date: '',
      category: '',
      description: '',
    });
  };

  return (
    <ExpenseFormStyled onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}

      <div className="input-control">
        <input
          type="text"
          value={title}
          name="title"
          placeholder="Expense Title"
          onChange={handleInput('title')}
        />
      </div>

      <div className="input-control">
        <input
          value={amount}
          type="number"
          name="amount"
          placeholder="Expense Amount"
          onChange={handleInput('amount')}
          min="0"
        />
      </div>

      <div className="input-control date-picker">
        <DatePicker
          id="date"
          placeholderText="Select a date"
          selected={date}
          dateFormat="dd/MM/yyyy"
          onChange={(date) => setInputState({ ...inputState, date })}
        />
      </div>

      <div className="selects input-control">
        <select
          required
          value={category}
          name="category"
          id="category"
          onChange={handleInput('category')}
        >
          <option value="" disabled>
            Select Category
          </option>
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
          name="description"
          value={description}
          placeholder="Add a reference or note"
          id="description"
          cols="30"
          rows="4"
          onChange={handleInput('description')}
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
    </ExpenseFormStyled>
  );
}

const ExpenseFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;

  .error {
    color: var(--color-delete);
    font-weight: 600;
    text-align: center;
  }

  input,
  textarea,
  select {
    font-family: inherit;
    font-size: clamp(0.9rem, 1.5vw, 1rem);
    outline: none;
    border: 2px solid #fff;
    padding: 0.75rem 1rem;
    border-radius: 10px;
    background: #fcf6f9;
    resize: none;
    box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.05);
    color: rgba(34, 34, 96, 0.9);
    transition: border-color 0.3s ease, box-shadow 0.3s ease;

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }

    &:focus {
      border-color: var(--color-accent);
      box-shadow: 0px 0px 6px rgba(245, 102, 146, 0.3);
    }
  }

  .input-control {
    width: 100%;
  }

  .date-picker input {
    width: 100%;
  }

  .selects select {
    width: 100%;
    color: rgba(34, 34, 96, 0.8);
    font-weight: 500;
    background: #fcf6f9;
    &:focus {
      border-color: var(--color-accent);
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;

    button {
      box-shadow: 0px 1px 10px rgba(245, 102, 146, 0.3);
      transition: all 0.3s ease;

      &:hover {
        background: var(--color-green) !important;
        box-shadow: 0px 3px 12px rgba(66, 173, 0, 0.3);
        transform: translateY(-2px);
      }
    }
  }

  /* 📱 Tablet view */
  @media (max-width: 900px) {
    padding: 1.5rem;
    gap: 1.2rem;
  }

  /* 📱 Mobile view */
  @media (max-width: 600px) {
    padding: 1rem;
    border-radius: 15px;
    gap: 1rem;

    input,
    textarea,
    select {
      font-size: 0.9rem;
      padding: 0.65rem 0.9rem;
    }

    .submit-btn button {
      width: 100%;
      border-radius: 20px;
    }
  }
`;

export default ExpenseForm;
