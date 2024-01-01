import React from "react";
import { Route, Routes } from "react-router-dom";

import App from "../App";
import Students from "../pages/Students";
import Events from "../pages/Events/Events";
import AcademicManagement from "../pages/AcademicManagement";
import Diaries from "../pages/Diaries";
import Courses from "../pages/Courses";
import Classes from "../pages/Classes";
import Disciplines from "../pages/Disciplines";
import StudentProfile from "../pages/StudentProfile";
import StudentGrades from "../pages/StudentGrades";
import StudentEvents from "../pages/StudentEvents";
import StudentNotes from "../pages/StudentNotes";
import StudentPEI from "../pages/StudentPEI";
import StudentDetails from "../pages/StudentDetails";
import Overview from "../pages/Overview";
import PageNotFound from "../pages/PageNotFound";

// Routes for authenticated users
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<Overview />} />
        <Route path="discentes" element={<Students />} />
        <Route path="discentes/:id" element={<StudentProfile />}>
          <Route path="dados-pessoais" element={<StudentDetails />} />
          <Route path="boletins" element={<StudentGrades />} />
          <Route path="eventos" element={<StudentEvents />} />
          <Route path="anotacoes" element={<StudentNotes />} />
          <Route path="pei" element={<StudentPEI />} />
        </Route>
        <Route path="eventos" element={<Events />} />
        <Route path="gestao-academica" element={<AcademicManagement />}>
          <Route path="diarios" element={<Diaries />} />
          <Route path="cursos" element={<Courses />} />
          <Route path="turmas" element={<Classes />} />
          <Route path="disciplinas" element={<Disciplines />} />
        </Route>
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
