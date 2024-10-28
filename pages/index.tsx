// pages/index.tsx
import Main from "@/components/Main";
import { useAuth } from "@/context/auth";
import HomePage from "./homePage";
import LoadingSpinner from "@/components/LoadingSpinner"; // Tailwindベースのローディングスピナー
import React from "react";

const Home: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    // 認証状態を読み込んでいる間はローディングスピナーを表示
    return <LoadingSpinner />;
  }

  return (
    <div>
      {/* ログインしていれば Main コンポーネントを表示、そうでなければ HomePage を表示 */}
      {user ? <Main /> : <HomePage />}
    </div>
  );
};

export default Home;
