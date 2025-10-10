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
  ArcElement,
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
  ArcElement
);

function Chart() {
  const { incomes, expenses } = useGlobalContext();

  const data = {
    labels: incomes.map((inc) => {
      const { date } = inc;
      return dateFormat(date);
    }),
    datasets: [
      {
        label: 'Income',
        data: incomes.map((income) => income.amount),
        borderColor: '#42AD00',
        backgroundColor: 'rgba(66, 173, 0, 0.3)',
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Expenses',
        data: expenses.map((expense) => expense.amount),
        borderColor: '#F56692',
        backgroundColor: 'rgba(245, 102, 146, 0.3)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // 🔑 Allows height to adapt to container
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'rgba(34, 34, 96, 0.7)',
          font: {
            size: 12,
            family: 'Nunito, sans-serif',
          },
        },
      },
      title: {
        display: true,
        text: 'Income vs Expenses Overview',
        color: '#222260',
        font: {
          size: 16,
          weight: 'bold',
          family: 'Nunito, sans-serif',
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'rgba(34, 34, 96, 0.6)',
          font: {
            size: 11,
          },
        },
        grid: {
          color: 'rgba(34, 34, 96, 0.05)',
        },
      },
      y: {
        ticks: {
          color: 'rgba(34, 34, 96, 0.6)',
          font: {
            size: 11,
          },
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

  /* 📱 Tablet */
  @media (max-width: 900px) {
    height: 320px;
    padding: 0.8rem;
  }

  /* 📱 Mobile */
  @media (max-width: 600px) {
    height: 280px;
    padding: 0.6rem;
    border-radius: 12px;
  }
`;

export default Chart;
