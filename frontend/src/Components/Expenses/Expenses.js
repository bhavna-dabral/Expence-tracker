import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { InnerLayout } from '../../styles/Layouts';
import ExpenseForm from './ExpenseForm';
import IncomeItem from '../IncomeItem/IncomeItem';

function Expenses() {
  const { expenses, getExpenses, deleteExpense, totalExpenses } = useGlobalContext();

  useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  return (
    <ExpensesStyled>
      <InnerLayout>
        <h1>Expenses</h1>

        <h2 className="total-expense">
          Total Expense: <span>${totalExpenses()}</span>
        </h2>

        <div className="expense-content">
          <div className="form-container">
            <ExpenseForm />
          </div>

          <div className="expenses-list">
            {expenses.length > 0 ? (
              expenses.map((expense) => (
                <IncomeItem
                  key={expense._id}
                  {...expense}
                  indicatorColor="var(--color-delete)"
                  deleteItem={deleteExpense}
                />
              ))
            ) : (
              <p className="no-expenses">No expenses recorded yet.</p>
            )}
          </div>
        </div>
      </InnerLayout>
    </ExpensesStyled>
  );
}

const ExpensesStyled = styled.div`
  display: flex;
  flex-direction: column;

  h1 { text-align: center; margin-bottom: 1rem; }
  .total-expense { text-align: center; margin-bottom: 1.5rem; span { color: var(--color-delete); font-weight: 700; } }

  .expense-content { display: flex; gap: 2rem; }
  .form-container { flex: 1; }
  .expenses-list { flex: 2; display: flex; flex-direction: column; gap: 1rem; }
  .no-expenses { text-align: center; color: rgba(34,34,96,0.6); margin-top: 2rem; }
`;

export default Expenses;