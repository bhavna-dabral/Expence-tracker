import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import { dollar } from "../../utils/Icons";

function Transactions() {
  const { getIncomes, getExpenses, incomes, expenses } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  // Combine both incomes and expenses
  const allTransactions = [...incomes, ...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <TransactionsStyled>
      <InnerLayout>
        <h2>Total Transactions</h2>

        {allTransactions.length > 0 ? (
          <div className="transactions-list">
            {allTransactions.map((item) => (
              <div
                key={item._id}
                className={`transaction ${item.type === "income" ? "income" : "expense"}`}
              >
                <div className="left">
                  <h4>{item.title}</h4>
                  <p className="category">{item.category}</p>
                </div>
                <div className="right">
                  <p className="amount">
                    {item.type === "income" ? "+" : "-"} {dollar} {item.amount}
                  </p>
                  <p className="date">{new Date(item.date).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No transactions found.</p>
        )}
      </InnerLayout>
    </TransactionsStyled>
  );
}

const TransactionsStyled = styled.div`
  h2 {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  .transactions-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .transaction {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fcf6f9;
    border: 1px solid #e4e4e4;
    border-left: 5px solid;
    padding: 1rem;
    border-radius: 10px;
    transition: 0.3s ease;
  }

  .transaction.income {
    border-left-color: green;
  }

  .transaction.expense {
    border-left-color: red;
  }

  .transaction:hover {
    background: #fff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  }

  .left h4 {
    margin: 0;
    font-size: 1rem;
  }

  .category {
    color: #777;
    font-size: 0.9rem;
  }

  .right {
    text-align: right;
  }

  .amount {
    font-weight: bold;
  }

  .date {
    color: #666;
    font-size: 0.8rem;
  }

  @media (max-width: 768px) {
    .transaction {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }

    .right {
      text-align: left;
    }
  }
`;

export default Transactions;
