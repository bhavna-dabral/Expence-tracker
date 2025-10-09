// src/Components/Layouts/Layouts.js
import styled from "styled-components";

// 🌟 Main layout wraps Navigation + Main Content
export const MainLayout = styled.div`
  display: flex;
  gap: 2rem;
  padding: 2rem;
  height: 100%;
  width: 100%;

  /* 📱 Responsive layout for mobile */
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

// 🌟 Inner layout wraps the content area inside the main layout
export const InnerLayout = styled.div`
  width: 100%;
  padding: 2rem 1.5rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  box-shadow: 0px 2px 20px rgba(0, 0, 0, 0.05);
  overflow-y: auto;

  /* 📱 Mobile styles */
  @media (max-width: 900px) {
    padding: 1rem;
  }

  /* 📱 Tablet styles */
  @media (max-width: 600px) {
    border-radius: 10px;
  }
`;
