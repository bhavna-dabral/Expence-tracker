import React, { useContext, useState, useCallback } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1/";
const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Create axios instance once
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
  });

  // ✅ Always attach latest token
  axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  // ✅ Optional — handle expired sessions globally
  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  );

  // ------------------ Incomes ------------------ //
  const getIncomes = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("get-incomes");
      setIncomes(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching incomes");
    }
  }, []);

  const addIncome = async (income) => {
    try {
      await axiosInstance.post("add-income", {
        ...income,
        amount: Number(income.amount),
        date:
          income.date instanceof Date
            ? income.date.toISOString()
            : income.date,
      });
      getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`delete-income/${id}`);
      getIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  const totalIncome = () =>
    incomes.reduce((acc, item) => acc + Number(item.amount), 0);

  // ------------------ Expenses ------------------ //
  const getExpenses = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("get-expenses");
      setExpenses(data);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching expenses");
    }
  }, []);

  const addExpense = async (expense) => {
    try {
      await axiosInstance.post("add-expense", {
        ...expense,
        amount: Number(expense.amount),
        date:
          expense.date instanceof Date
            ? expense.date.toISOString()
            : expense.date,
      });
      getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`delete-expense/${id}`);
      getExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const totalExpenses = () =>
    expenses.reduce((acc, item) => acc + Number(item.amount), 0);

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
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
