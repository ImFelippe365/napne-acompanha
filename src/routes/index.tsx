import React, { useEffect } from "react";
import { BrowserRouter, useNavigation } from "react-router-dom";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";
import { useAuth } from "../hooks/AuthContext";

const Routes: React.FC = () => {
  const { user, restoreSession } = useAuth();
  const isAuthenticated = !!user;

  

  console.log(user, isAuthenticated)

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <BrowserRouter>
        {isAuthenticated ? <AppRoutes /> : <AuthRoutes />}
    </BrowserRouter>
  );
};

export default Routes;
