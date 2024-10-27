import React, { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";
import Head from "next/head";
import Modal from "@/components/Modal";
import StepsSection from "@/components/Steps";
import { GoalType } from "@/types";
import Time from "@/components/Time";
import dynamic from "next/dynamic";

// DateTimePicker コンポーネントを動的にインポート（SSR無効）
const DateTimePicker = dynamic(() => import("@/components/DateTimePicker"), {
  ssr: false,
});

const Step = () => {
  const router = useRouter();
  const { goalId } = router.query;
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [isSecondModalOpen, setSecondModalOpen] = useState<boolean>(false); // 新しいモーダル用の状態を追加
  const [goal, setGoal] = useState<GoalType | null>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openSecondModal = () => setSecondModalOpen(true); // 新しいモーダルを開く関数
  const closeSecondModal = () => setSecondModalOpen(false); // 新しいモーダルを閉じる関数

  // 目標の内容を管理する状態
  const [content, setContent] = useState<string>("");
  // 期限を管理する新しい状態
  const [deadline, setDeadline] = useState<string>("");
  // 未来の自分を管理する新しい状態
  const [future, setFuture] = useState<string>("");

  // 目標の内容を管理する状態
  const [contentS, setContentS] = useState<string>("");
  // 期限を管理する新しい状態
  const [deadlineS, setDeadlineS] = useState<string>("");
  // 未来の自分を管理する新しい状態
  const [reward, setReward] = useState<string>("");
  const [steps, setSteps] = useState([]);

  useEffect(() => {
    if (!goalId) return;

    const fetchGoal = async () => {
      try {
        const response = await apiClient.get(`/posts/goal_set/${goalId}`);
        const stepList = await apiClient.get(`/posts/steps_get/${goalId}`);
        if (!response.data) {
          return;
        }
        setGoal(response.data);
        setContent(response.data.content || "");
        setDeadline(response.data.deadLine || "");
        setFuture(response.data.future || "");
        setSteps(stepList.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchGoal();
  }, [goalId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deadlineInUTC = new Date(deadline).toLocaleString("ja-JP");
    try {
      await apiClient.put(`/posts/goal_update/${goalId}`, {
        content: content,
        deadLine: deadlineInUTC, // 期限を送信
        future: future,
      });
      router.reload();
    } catch (e) {
      console.error(e);
      alert("正しくありません");
    }
  };

  const handleSubmitStep = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const deadlineInUTCS = new Date(deadlineS).toLocaleString("ja-JP");
    try {
      await apiClient.post(`/posts/step_post/${goalId}`, {
        content: contentS,
        deadLine: deadlineInUTCS, // 期限を送信
        reward: reward,
      });
      router.reload();
    } catch (e) {
      console.error(e);
      alert("正しくありません");
    }
  };

  const closeGoal = async () => {
    const reaction = confirm("本当に削除しますか？");
    if (reaction) {
      try {
        await apiClient.delete(`/posts/goal_delete/${goalId}`);
        router.push("/");
      } catch (e) {
        console.error(e);
        alert("正しくありません");
      }
    }
  };

  if (!goal) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex items-center space-x-2 text-gray-700">
          <svg
            className="w-8 h-8 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <div className="text-lg font-medium">読み込み中...</div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{goal.content}</title>
      </Head>

      <div className="container sm:px-5 py-10 mx-auto">
        <div className="flex flex-wrap w-full mb-5 flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            {goal.content}
          </h1>
          <p className="lg:w-1/2 w-full leading-relaxed text-base">
            期限：{new Date(goal.deadLine).toLocaleString()}
          </p>
          <p className="text-md font-medium text-purple-600 mt-5">残り時間</p>

          <Time deadLine={new Date(goal.deadLine)} />
          <p className="text-md font-medium text-purple-600 mt-5">目指す自分</p>
          <p className="lg:w-1/2 w-full leading-relaxed text-base whitespace-pre-wrap">
            {goal.future}
          </p>

          <div className="flex mt-5">
            <button
              className="px-4 py-2 bg-purple-400 text-white rounded"
              onClick={openModal}
            >
              ステップ追加
            </button>
            <button
              className="px-4 py-2 bg-purple-700 text-white rounded ml-3"
              onClick={openSecondModal}
            >
              目標修正
            </button>
          </div>

          {/* 最初のモーダル */}
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <h2 className="text-xl font-bold mb-4">ステップの設定</h2>
            <form onSubmit={handleSubmitStep}>
              <div>
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-gray-700"
                >
                  ステップの設定
                </label>
                <input
                  id="contentS"
                  name="contentS"
                  type="text"
                  autoComplete="contentS"
                  required
                  value={contentS}
                  onChange={(e) => setContentS(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              {/* 未来の自分を入力 */}
              <div className="mt-6">
                <label
                  htmlFor="future"
                  className="block text-sm font-medium text-gray-700"
                >
                  達成したときのご褒美
                </label>
                <textarea
                  id="reward"
                  name="reward"
                  rows={4} // 必要に応じて行数を調整
                  autoComplete="reward"
                  required
                  value={reward}
                  onChange={(e) => setReward(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
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
                  id="deadlineS"
                  name="deadlineS"
                  required
                  value={deadlineS}
                  onChange={(value) => setDeadlineS(value)} // 修正済み
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* 送信ボタン */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  作成
                </button>
              </div>
            </form>
          </Modal>

          {/* 新しいモーダル */}
          <Modal isOpen={isSecondModalOpen} onClose={closeSecondModal}>
            <div>
              <h2 className="text-xl font-bold mb-4">目標修正</h2>
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
                    onChange={(e) => setContent(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
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
                    onChange={(e) => setFuture(e.target.value)}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
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
                    value={deadline}
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
                    更新
                  </button>
                </div>
              </form>

              <button
                className="mt-4 px-4 py-2 bg-blue-700 text-white rounded"
                onClick={closeGoal}
              >
                目標削除
              </button>
            </div>
          </Modal>
        </div>
        <div className="-mt-10">
          <main className="container mx-auto">
            <StepsSection steps={steps} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Step;
