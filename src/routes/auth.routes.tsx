import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";

// import { Container } from './styles';

// Routes for authenticated users
const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/entrar" element={<SignIn />} />
    </Routes>
  );
};

export default AuthRoutes;
