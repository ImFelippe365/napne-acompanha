import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../components/Header";

// Routes for authenticated users
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route
          path="login"
          element={<span className="font-bold text-red-500">faça login </span>}
        />
        <Route path="signup" element={<div>cria conta</div>} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
