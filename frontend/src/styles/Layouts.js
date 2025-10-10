// src/styles/Layouts.js
import styled from "styled-components";

// 🌟 Main layout wraps Navigation + Main Content
export const MainLayout = styled.div`
  display: flex;
  gap: clamp(1rem, 2vw, 2rem);
  padding: clamp(1rem, 2vw, 2rem);
  height: 100%;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  overflow-x: hidden;

  /* 📱 Responsive layout for tablets and mobile */
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    height: auto;
  }

  @media (max-width: 600px) {
    padding: 0.8rem;
    gap: 0.8rem;
  }
`;

// 🌟 Inner layout wraps the content area inside the main layout
export const InnerLayout = styled.div`
  width: 100%;
  padding: clamp(1rem, 2vw, 2rem) clamp(1rem, 1.5vw, 1.5rem);
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.3s ease;

  /* 📱 Mobile styles */
  @media (max-width: 900px) {
    padding: 1rem;
    border-radius: 16px;
  }

  /* 📱 Small phones */
  @media (max-width: 600px) {
    border-radius: 12px;
    padding: 0.8rem;
  }

  /* 🧭 Scrollbar improvements for mobile */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(34, 34, 96, 0.25);
    border-radius: 8px;
  }
`;
