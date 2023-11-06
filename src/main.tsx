import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Routes from "./routes/index.tsx";
import { AuthProvider } from "./hooks/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  </React.StrictMode>
);
