import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";

// import { Container } from './styles';

// Routes for authenticated users
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="login" element={<span>faça login </span>} />
        <Route path="signup" element={<div>cria conta</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
