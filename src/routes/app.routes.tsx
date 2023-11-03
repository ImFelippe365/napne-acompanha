import React from "react";
import { Route, Routes } from "react-router-dom";

import App from "../App";
import Students from "../pages/Students";
import Events from "../pages/Events";
import AcademicManagement from "../pages/AcademicManagement";
import Diaries from "../pages/Diaries";
import Courses from "../pages/Courses"
import Classes from "../pages/Classes"
import Disciplines from "../pages/Disciplines";

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
        <Route path="eventos" element={<Events />} />
        <Route path="gestao-academica" element={<AcademicManagement />}>
          <Route path="diarios" element={<Diaries />} />
          <Route path="cursos" element={<Courses />} />
          <Route path="turmas" element={<Classes />} />
          <Route path="disciplinas" element={<Disciplines />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
