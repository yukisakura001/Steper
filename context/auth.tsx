import apiClient from "@/lib/apiClient";
import React, { useContext, ReactNode, useEffect, useState } from "react";
import router from "next/router";

interface AuthContextProps {
  //AuthContextPropsの型を定義
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
}); //初期値

export const useAuth = () => {
  return useContext(AuthContext); //useContextでAuthContextを返す
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  //childrenはこのタグの中にあるものを指す
  const [user, setUser] = useState<null | {
    id: number;
    username: string;
    email: string;
  }>(null); //userの初期値をnullに設定。型はid,username,emailを持つオブジェクトかnull

  useEffect(() => {
    const token = localStorage.getItem("auth_token"); //localStorageに保存されたtokenを取得
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`; //axiosのデフォルトヘッダーにtokenを設定
      apiClient
        .get("/users/find")
        .then((response) => {
          setUser(response.data.user); //ユーザー情報を取得 全体に共有するためにuseStateを使う
        })
        .catch((error) => {
          console.error(error); //エラーが出た場合はコンソールにエラーを表示
        });
    }
  }, []);

  const login = async (token: string) => {
    localStorage.setItem("auth_token", token); //localStorageにtokenを保存
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`; //ここも設定しないとログイン後のリクエストでエラーが出る
    try {
      apiClient.get("/users/find").then((response) => {
        //ログインするときにユーザー情報を取得
        setUser(response.data.user); //ユーザー情報を取得 全体に共有するためにuseStateを使う
      });
    } catch (error) {
      alert(error);
    }
    router.push("/"); //ログイン後にリダイレクト
  };
  const logout = () => {
    localStorage.removeItem("auth_token"); //localStorageのtokenを削除
    setUser(null); //ユーザー情報をnullにする
    delete apiClient.defaults.headers["Authorization"]; //axiosのデフォルトヘッダーからtokenを削除
    router.push("/"); //ログイン後にリダイレクト
  };
  const value = { user, login, logout }; //valueにloginとlogoutを入れる

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>; //AuthProviderでvalueを渡す
};
