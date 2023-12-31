import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/index.tsx";
import { AuthProvider } from "./hooks/AuthContext.tsx";
import { StudentProvider } from "./hooks/StudentContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <StudentProvider>
        <Routes />
      </StudentProvider>
    </AuthProvider>
  </React.StrictMode>
);
