import apiClient from "@/lib/apiClient";
import React, { useContext, ReactNode, useEffect, useState } from "react";
import router from "next/router";

interface AuthContextProps {
  user: null | {
    id: number;
    username: string;
    email: string;
  };
  login: (token: string) => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

// ローカルストレージのキー名を定義
const AUTH_TOKEN_KEY = "auth_token";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    username: string;
    email: string;
  }>(null);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY); // ローカルストレージからトークンを取得
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      apiClient
        .get("/users/find")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token); // ローカルストレージにトークンを保存
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
      const response = await apiClient.get("/users/find");
      setUser(response.data.user);
    } catch (error) {
      alert(error);
    }
    router.push("/");
  };

  const logout = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY); // ローカルストレージからトークンを削除
    setUser(null);
    delete apiClient.defaults.headers["Authorization"];
    router.push("/");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
