import React, { useEffect } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../../context/globalContext";
import { InnerLayout } from "../../styles/Layouts";
import Chart from "../Chart/Chart";
import { dollar } from "../../utils/Icons";

function Dashboard() {
  const {
    totalIncome,
    totalExpenses,
    totalBalance,
    getIncomes,
    getExpenses,
    transactionHistory,
  } = useGlobalContext();

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [getIncomes, getExpenses]);

  const history = transactionHistory();

  return (
    <DashboardStyled>
      <InnerLayout>
        <h1>All Transactions</h1>

        <div className="stats-con">
          {/* Chart & totals */}
          <div className="chart-con">
            <Chart />
            <div className="amount-con">
              <div className="income">
                <h2>Total Income</h2>
                <p>{dollar} {totalIncome()}</p>
              </div>
              <div className="expense">
                <h2>Total Expense</h2>
                <p>{dollar} {totalExpenses()}</p>
              </div>
              <div className="balance">
                <h2>Total Balance</h2>
                <p>{dollar} {totalBalance()}</p>
              </div>
            </div>
          </div>

          {/* Transaction history */}
          <div className="history-con">
            <h2>Recent Transactions</h2>
            {history.length > 0 ? (
              <div className="transactions">
                {history.map((item) => (
                  <div
                    key={item._id}
                    className={`transaction ${item.type === "income" ? "income" : "expense"}`}
                  >
                    <div className="left">
                      <p className="title">{item.title}</p>
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
              <p>No transactions yet</p>
            )}
          </div>
        </div>
      </InnerLayout>
    </DashboardStyled>
  );
}

const DashboardStyled = styled.div`
  h1 { font-size: 2rem; margin-bottom: 1.5rem; }

  .stats-con {
    display: flex;
    gap: 2rem;

    .chart-con {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .amount-con {
        display: flex;
        gap: 1rem;

        .income, .expense, .balance {
          background: #fcf6f9;
          padding: 1rem;
          border-radius: 15px;
          text-align: center;
        }
      }
    }

    .history-con {
      flex: 1;
      background: #fcf6f9;
      padding: 1rem;
      border-radius: 15px;
      max-height: 500px;
      overflow-y: auto;

      .transactions {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .transaction {
          display: flex;
          justify-content: space-between;
          padding: 0.5rem;
          border-radius: 8px;
          background: #fff;

          &.income { border-left: 4px solid green; }
          &.expense { border-left: 4px solid red; }

          .left { display: flex; flex-direction: column; }
          .right { text-align: right; }

          .amount { font-weight: bold; }
          .date { font-size: 0.8rem; color: #555; }
        }
      }
    }
  }
`;

export default Dashboard;
