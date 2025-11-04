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

  // ✅ Sort by date for proper trend display
  const sortedIncomes = [...incomes].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // ✅ Create a combined set of labels
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
          const income = sortedIncomes.find(
            (i) => dateFormat(i.date) === label
          );
          return income ? income.amount : 0;
        }),
        borderColor: '#42AD00',
        backgroundColor: 'rgba(66, 173, 0, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#42AD00',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Expenses',
        data: labels.map((label) => {
          const expense = sortedExpenses.find(
            (e) => dateFormat(e.date) === label
          );
          return expense ? expense.amount : 0;
        }),
        borderColor: '#F56692',
        backgroundColor: 'rgba(245, 102, 146, 0.2)',
        borderWidth: 3,
        pointBackgroundColor: '#F56692',
        pointBorderColor: '#fff',
        pointRadius: 5,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#222260',
          font: {
            size: 12,
            family: 'Nunito, sans-serif',
          },
        },
      },
      title: {
        display: true,
        text: 'Income vs Expense Trend',
        color: '#222260',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        usePointStyle: true,
        callbacks: {
          label: (tooltipItem) => {
            const date = tooltipItem.label;
            const value = tooltipItem.raw;
            return `${tooltipItem.dataset.label}: ₹${value} on ${date}`;
          },
        },
        backgroundColor: '#fff',
        titleColor: '#222260',
        bodyColor: '#222260',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#555',
          font: { size: 11 },
        },
        grid: {
          color: 'rgba(34, 34, 96, 0.05)',
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#555',
          font: { size: 11 },
          callback: (value) => `₹${value}`,
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
  height: 400px;
  width: 100%;
  overflow: hidden;

  .chart-container {
    height: 100%;
    width: 100%;
  }

  @media (max-width: 900px) {
    height: 320px;
  }

  @media (max-width: 600px) {
    height: 260px;
  }
`;

export default IncomeExpenseChart;
