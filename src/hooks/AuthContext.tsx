import React, { createContext, useCallback, useContext, useState } from "react";
import { api } from "../services/api";
import { AuthenticationResponse, Credentials } from "../interfaces/Auth";
import { User } from "../interfaces/User";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthContextValues {
  user: User | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  login: (credentials: Credentials) => Promise<any>;
  restoreSession: () => Promise<void>;
}

const AuthContext = createContext({} as AuthContextValues);

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>();

  const login = useCallback(async (credentials: Credentials) => {
    try {
      const { data } = await api.post("authentication/login", credentials);
      const { user, access_token } = data as AuthenticationResponse;

      setUser(user);

      localStorage.setItem("@NapneAcompanha:user", JSON.stringify(user));
      localStorage.setItem(
        "@NapneAcompanha:token",
        JSON.stringify(access_token)
      );

      return data;
    } catch (e) {
      console.log("Erro ao validar usuário", e);
    }
  }, []);

  const restoreSession = useCallback(async () => {
    try {
      const savedUser = localStorage.getItem("@NapneAcompanha:user");
      const savedToken = localStorage.getItem("@NapneAcompanha:token");

      if (savedUser && savedToken) {
        const userData = JSON.parse(savedUser);

        setUser(userData);
      }
    } catch (e) {
      console.log("Erro ao restaurar sessão", e);
    }
  }, []);

  const contextValues = {
    user,
    setUser,
    login,
    restoreSession,
  };

  return (
    <AuthContext.Provider value={contextValues}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export { AuthProvider, useAuth };
