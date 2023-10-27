import React from "react";
import { Route, Routes } from "react-router-dom";
import App from "../App";
import Students from "../pages/Students";
import AcademicManagement from "../pages/AcademicManagement";

// Routes for authenticated users
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route
          path="login"
          element={<span className="font-bold text-red-500">faça login </span>}
        />
        <Route path="discentes" element={<Students />} />
        <Route path="discentes/:id" element={<div>perfil do discente</div>} />
        <Route path="eventos" element={<div>eventos</div>} />
        <Route path="gestao-academica" element={<AcademicManagement />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
