import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/index.tsx";
import { AuthProvider } from "./hooks/AuthContext.tsx";
import { StudentProvider } from "./hooks/StudentContext.tsx";
import { QuickToastProvider } from "./hooks/QuickToastContext.tsx";
import { AcademicManegementProvider } from "./hooks/AcademicManegementContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuickToastProvider>
      <AuthProvider>
        <AcademicManegementProvider>
          <StudentProvider>
            <Routes />
          </StudentProvider>
        </AcademicManegementProvider>
      </AuthProvider>
    </QuickToastProvider>
  </React.StrictMode>
);
