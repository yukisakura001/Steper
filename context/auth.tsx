import apiClient from "@/lib/apiClient";
import React, { useContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie"; // クッキー操作用のライブラリ（js-cookie）を使います
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

// クッキーのキー名を定義しておくと便利
const AUTH_TOKEN_COOKIE = "auth_token";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<null | {
    id: number;
    username: string;
    email: string;
  }>(null);

  useEffect(() => {
    const token = Cookies.get(AUTH_TOKEN_COOKIE); // クッキーからトークンを取得
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
    Cookies.set(AUTH_TOKEN_COOKIE, token, { expires: 31 });
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    try {
      apiClient.get("/users/find").then((response) => {
        setUser(response.data.user);
      });
    } catch (error) {
      alert(error);
    }
    router.push("/");
  };

  const logout = () => {
    Cookies.remove(AUTH_TOKEN_COOKIE); // クッキーからトークンを削除
    setUser(null);
    delete apiClient.defaults.headers["Authorization"];
    router.push("/");
  };

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
