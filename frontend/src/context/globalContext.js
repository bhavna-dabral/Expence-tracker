import React, { useContext, useState, useCallback, useMemo } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "https://expence-tracker2.onrender.com/api/v1/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [error, setError] = useState(null);

  // ✅ Memoize axios instance to avoid recreation on each render
  const axiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: BASE_URL,
      headers: { "Content-Type": "application/json" },
    });

    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });

    instance.interceptors.response.use(
      (res) => res,
      (err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
        return Promise.reject(err);
      }
    );

    return instance;
  }, []);

  // ------------------ 💰 INCOMES ------------------ //
  const getIncomes = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("get-incomes");
      setIncomes(Array.isArray(data.incomes) ? data.incomes : data || []);
    } catch (err) {
      console.error("Error fetching incomes:", err);
      setError(err.response?.data?.message || "Error fetching incomes");
      setIncomes([]);
    }
  }, [axiosInstance]);

  const addIncome = async (income) => {
    try {
      await axiosInstance.post("add-income", {
        ...income,
        amount: Number(income.amount),
        date: income.date instanceof Date ? income.date.toISOString() : income.date,
      });
      await getIncomes();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding income");
    }
  };

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(`delete-income/${id}`);
      await getIncomes();
    } catch (err) {
      console.error(err);
    }
  };

  const totalIncome = () =>
    incomes.reduce((acc, item) => acc + Number(item.amount), 0);

  // ------------------ 💸 EXPENSES ------------------ //
  const getExpenses = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("get-expenses");
      setExpenses(Array.isArray(data.expenses) ? data.expenses : data || []);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      setError(err.response?.data?.message || "Error fetching expenses");
      setExpenses([]);
    }
  }, [axiosInstance]);

  const addExpense = async (expense) => {
    try {
      await axiosInstance.post("add-expense", {
        ...expense,
        amount: Number(expense.amount),
        date: expense.date instanceof Date ? expense.date.toISOString() : expense.date,
      });
      await getExpenses();
    } catch (err) {
      setError(err.response?.data?.message || "Error adding expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(`delete-expense/${id}`);
      await getExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const totalExpenses = () =>
    expenses.reduce((acc, item) => acc + Number(item.amount), 0);

  // ------------------ 📊 TOTALS + HISTORY ------------------ //
  const totalBalance = () => totalIncome() - totalExpenses();

  const transactionHistory = () => {
    const history = [...incomes, ...expenses];
    history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return history.slice(0, 3);
  };

  // ------------------ PROVIDER ------------------ //
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
