import React, { createContext } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext({});

const AuthProvider = ({ children }: AuthProviderProps) => {
  const contextValues = {};

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return {};
};

export { AuthProvider, useAuth };
