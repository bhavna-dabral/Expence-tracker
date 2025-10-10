import React, { useContext, useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // ------------------ Incomes ------------------ //
  const getIncomes = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-incomes`);
      setIncomes(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addIncome = async (income) => {
    try {
      await axios.post(`${BASE_URL}add-income`, {
        ...income,
        amount: Number(income.amount), // Ensure number
        date: income.date instanceof Date ? income.date.toISOString() : income.date
      });
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-income/${id}`);
      getIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  const totalIncome = () => incomes.reduce((acc, item) => acc + Number(item.amount), 0);

  // ------------------ Expenses ------------------ //
  const getExpenses = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-expenses`);
      setExpenses(response.data);
    } catch (err) {
      console.error(err);
    }
  }, []);

  const addExpense = async (expense) => {
    try {
      await axios.post(`${BASE_URL}add-expense`, {
        ...expense,
        amount: Number(expense.amount),
        date: expense.date instanceof Date ? expense.date.toISOString() : expense.date
      });
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const totalExpenses = () => expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  // ------------------ Balance & History ------------------ //
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  return (
    <GlobalContext.Provider
      value={{
        incomes,
        addIncome,
        getIncomes,
        deleteIncome,
        expenses,
        addExpense,
        getExpenses,
        deleteExpense,
        totalIncome,
        totalExpenses,
        totalBalance,
        transactionHistory,
        error,
        setError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
