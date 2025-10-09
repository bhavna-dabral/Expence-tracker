// src/Components/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* CSS Reset */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    list-style: none;
  }

  :root {
    --primary-color: #222260;
    --color-green: #42AD00;
    --color-grey: #AAA;
    --color-accent: #F56692;
    --color-delete: #FF0000;
    --bg-light: #fcf6f9;
  }

  body {
    font-family: 'Nunito', sans-serif;
    background-color: var(--bg-light);
    color: rgba(34, 34, 96, 0.6);
    font-size: clamp(1rem, 1.5vw, 1.1rem);
    overflow-x: hidden;
    min-height: 100vh;
    transition: all 0.3s ease;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--primary-color);
  }

  button {
    cursor: pointer;
    border: none;
    outline: none;
    background: none;
  }

  /* Error Animation */
  .error {
    color: red;
    animation: shake 0.4s ease-in-out;
  }

  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(8px); }
    50% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
    100% { transform: translateX(0); }
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(34, 34, 96, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: rgba(34, 34, 96, 0.5);
  }
`;
