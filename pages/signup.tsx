import React, { useState } from "react";
import Head from "next/head";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter(); //リダイレクトするための関数

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //新規登録APIをここに書く
    try {
      const res = await apiClient.post("/auth/register", {
        email: email,
        password: password,
      });
      if (res.status === 200) {
        alert(
          "認証メールを送信します。認証URLをクリックしてからログインしてください"
        );
        router.push("/login"); //リダイレクト
      } else {
        alert(res.statusText);
      }
    } catch (e) {
      console.error(e);
      alert("エラー");
    }
  };

  return (
    <div>
      <div
        style={{ height: "88vh" }}
        className="flex flex-col justify-center sm:px-6 lg:px-8"
      >
        <Head>
          <title>新規作成</title>
        </Head>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            アカウントを作成
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  メールアドレス
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-6">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  パスワード
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  新規登録
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      ;
    </div>
  );
};

export default Signup;
