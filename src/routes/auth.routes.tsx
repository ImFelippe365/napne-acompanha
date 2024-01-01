import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn";
import PageNotFound from "../pages/PageNotFound";

// import { Container } from './styles';

// Routes for authenticated users
const AuthRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/entrar" element={<SignIn />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AuthRoutes;
