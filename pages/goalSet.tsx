// pages/GoalSet.tsx
import React, { useState } from "react";
import Head from "next/head";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const DateTimePicker = dynamic(() => import("../components/DateTimePicker"), {
  ssr: false,
});

export default function GoalSet() {
  // 目標の内容を管理する状態
  const [content, setContent] = useState<string>("");
  const [contentChars, setContentChars] = useState<number>(0);

  // 期限を管理する新しい状態
  const [deadline, setDeadline] = useState<string>("");

  // 未来の自分を管理する新しい状態
  const [future, setFuture] = useState<string>("");
  const [futureChars, setFutureChars] = useState<number>(0);

  const router = useRouter(); // リダイレクト用

  // フォーム送信ハンドラー
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deadlineInUTC = new Date(deadline).toISOString();
    try {
      await apiClient.post("/posts/goals_post", {
        content: content,
        deadLine: deadlineInUTC, // 期限を送信
        future: future,
      });
      router.push("/"); // リダイレクト
    } catch (e) {
      console.error(e);
      alert("正しくありません");
    }
  };

  // ハンドラーで文字数をカウント
  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 50) {
      setContent(value);
      setContentChars(value.length);
    }
  };

  const handleFutureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 300) {
      setFuture(value);
      setFutureChars(value.length);
    }
  };

  return (
    <div>
      <div className="flex flex-col py-24 justify-center sm:px-6 lg:px-8">
        <Head>
          <title>目標新規作成</title>
        </Head>
        <div className=" sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            目標を設定してください
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit}>
              {/* 目標の入力フィールド */}
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  目標の設置
                </label>
                <input
                  id="content"
                  name="content"
                  type="text"
                  autoComplete="content"
                  required
                  value={content}
                  onChange={handleContentChange}
                  maxLength={50} // 追加
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {contentChars}/50 文字
                </p>
              </div>

              {/* 未来の自分を入力 */}
              <div className="mt-6">
                <label
                  htmlFor="future"
                  className="block text-sm font-medium text-gray-700"
                >
                  達成したときの自分の姿
                </label>
                <textarea
                  id="future"
                  name="future"
                  rows={4} // 必要に応じて行数を調整
                  autoComplete="future"
                  required
                  value={future}
                  onChange={handleFutureChange}
                  maxLength={300} // 追加
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {futureChars}/300 文字
                </p>
              </div>

              {/* 期限の入力フィールド */}
              <div className="mt-6">
                <label
                  htmlFor="deadline"
                  className="block text-sm font-medium text-gray-700"
                >
                  期限の設定
                </label>
                <DateTimePicker
                  id="deadline"
                  name="deadline"
                  required
                  onChange={(value) => setDeadline(value)} // 修正済み
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* 送信ボタン */}
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
      {/* 不要なセミコロンを削除 */}
    </div>
  );
}
