import React from 'react';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';
import { useGlobalContext } from '../../context/globalContext';
import { dateFormat } from '../../utils/dateFormat';

ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function IncomeExpenseChart() {
  const { incomes, expenses } = useGlobalContext();

  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const labels = Array.from(
    new Set([
      ...sortedIncomes.map((inc) => dateFormat(inc.date)),
      ...sortedExpenses.map((exp) => dateFormat(exp.date)),
    ])
  ).sort((a, b) => new Date(a) - new Date(b));

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: labels.map((label) => {
          const income = sortedIncomes.find((i) => dateFormat(i.date) === label);
          return income ? income.amount : 0;
        }),
        borderColor: '#42AD00',
        backgroundColor: 'rgba(66, 173, 0, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#42AD00',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: labels.map((label) => {
          const expense = sortedExpenses.find((e) => dateFormat(e.date) === label);
          return expense ? expense.amount : 0;
        }),
        borderColor: '#F56692',
        backgroundColor: 'rgba(245, 102, 146, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#F56692',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'center',
        labels: {
          boxWidth: 10,
          padding: 12,
          font: {
            size: window.innerWidth < 600 ? 10 : 12,
          },
        },
      },
      title: {
        display: window.innerWidth > 500,
        text: 'Income vs Expense Trend',
        font: { size: 14, weight: 'bold' },
      },
      tooltip: {
        bodyFont: { size: 11 },
        titleFont: { size: 12 },
        padding: 8,
        backgroundColor: '#fff',
        titleColor: '#222260',
        bodyColor: '#222260',
        borderColor: '#ddd',
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 30,
          font: { size: 10 },
        },
        grid: {
          color: 'rgba(34, 34, 96, 0.05)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${value}`,
          font: { size: 10 },
        },
        grid: {
          color: 'rgba(34, 34, 96, 0.05)',
        },
      },
    },
  };

  return (
    <ChartStyled>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </ChartStyled>
  );
}

const ChartStyled = styled.div`
  background: #fcf6f9;
  border: 2px solid #ffffff;
  box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
  padding: 1rem;
  border-radius: 20px;
  width: 100%;
  max-width: 100%;
  height: 380px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  .chart-container {
    width: 100%;
    height: 100%;
    position: relative;
  }

  @media (max-width: 900px) {
    height: 300px;
    padding: 0.8rem;
  }

  @media (max-width: 600px) {
    height: 250px;
    padding: 0.6rem;
    border-radius: 15px;
  }

  @media (max-width: 400px) {
    height: 220px;
    padding: 0.5rem;
    border-radius: 12px;
  }
`;

export default IncomeExpenseChart;
