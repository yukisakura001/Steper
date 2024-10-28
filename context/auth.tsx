// context/auth.tsx
import apiClient from "@/lib/apiClient";
import React, { useContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContextProps {
  user: User | null;
  loading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = React.createContext<AuthContextProps>({
  user: null,
  loading: true,
  login: async () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      apiClient
        .get("/users/find")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          console.error("Authentication error:", error);
          localStorage.removeItem("auth_token");
          delete apiClient.defaults.headers["Authorization"];
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    setLoading(true);
    try {
      const response = await apiClient.get("/users/find");
      setUser(response.data.user);
      router.push("/");
    } catch (error) {
      console.error("Login error:", error);
      alert("ログインに失敗しました。");
      logout();
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    delete apiClient.defaults.headers["Authorization"];
    router.push("/");
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
