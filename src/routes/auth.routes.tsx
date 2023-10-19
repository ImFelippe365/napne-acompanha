import React from "react";
import { Route, Routes } from "react-router-dom";

// import { Container } from './styles';

// Routes for authenticated users
const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<div>nao autenticado</div>} />
    </Routes>
  );
};

export default AuthRoutes;
