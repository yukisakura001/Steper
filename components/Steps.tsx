import React, { useState } from "react";
import Time from "../components/Time";
import { FiMoreVertical } from "react-icons/fi"; // アイコンをインポート
import router from "next/router";
import apiClient from "@/lib/apiClient";

interface Step {
  id: number;
  content: string;
  reward: string;
  deadLine: string;
  clearTime: string;
}

const StepsSection = ({ steps }: { steps: Step[] }) => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="relative">
          {/* デスクトップ用の縦線 */}
          <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full border-l-2 border-gray-300 z-0"></div>
          {/* モバイル用の縦線 */}
          <div className="block md:hidden absolute top-0 left-8 h-full border-l-2 border-gray-300 z-0"></div>
          {steps
            .slice()
            .reverse()
            .map((step, index) => (
              <StepCard
                key={index}
                step={step}
                index={index}
                stepsLength={steps.length}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({
  step,
  index,
  stepsLength,
}: {
  step: Step;
  index: number;
  stepsLength: number;
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const stepDelete = async () => {
    await apiClient.delete(`/posts/step_delete/${step.id}`);
    router.reload();
  };

  const stepEnd = async () => {
    if (step.clearTime === "1970-01-01T00:00:00.000Z") {
      await apiClient.put(`/posts/step_update/${step.id}`, {
        clearTime: new Date().toLocaleString(),
      });
      router.reload();
      return;
    } else {
      await apiClient.put(`/posts/step_update/${step.id}`, {
        clearTime: "1970-01-01T00:00:00.000Z",
      });
      router.reload();
      return;
    }
  };

  const checkPast = (deadLine: Date, clearTime: string) => {
    const now = new Date();
    if (clearTime !== "1970-01-01T00:00:00.000Z") {
      return "bg-green-100";
    } else if (deadLine < now) {
      return "bg-red-100";
    } else {
      return "bg-white";
    }
  };

  // メニュー外をクリックしたときにメニューを閉じる
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        !target.closest(`#menu-button-${index}`) &&
        !target.closest(`#menu-${index}`)
      ) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, index]);

  return (
    <div className="flex flex-col md:flex-row relative mb-12 last:mb-0">
      {/* ステップ番号 */}
      <div
        className={`flex items-center md:w-1/2 w-full px-4 z-10 ${
          index % 2 === 0
            ? "md:order-2 md:justify-start md:pl-6"
            : "md:order-1 md:justify-end md:pr-6"
        }`}
      >
        <div className="bg-purple-500 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg">
          {stepsLength - index}
        </div>
      </div>
      {/* ステップ内容 */}
      <div
        className={`md:w-1/2 w-full px-4 mt-4 md:mt-0 z-10 ${
          index % 2 === 0 ? "md:order-1" : "md:order-2"
        }`}
      >
        <div
          className={`${checkPast(
            new Date(step.deadLine),
            step.clearTime
          )} p-6 rounded-lg shadow-md relative`}
        >
          {/* メニューボタン */}
          <button
            id={`menu-button-${index}`}
            className="absolute top-2 right-2 text-gray-500 focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <FiMoreVertical
              size={28}
              className="text-gray-700 hover:text-gray-900"
            />
          </button>
          {/* ドロップダウンメニュー */}
          {isMenuOpen && (
            <div
              id={`menu-${index}`}
              className="absolute top-10 right-2 bg-white border rounded shadow-lg z-20"
            >
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={stepEnd}
              >
                {step.clearTime === "1970-01-01T00:00:00.000Z"
                  ? "達成"
                  : "達成解除"}
              </button>
              <button
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                onClick={stepDelete}
              >
                削除
              </button>
            </div>
          )}
          <h2 className="text-xl font-semibold mb-2">{step.content}</h2>
          <div className="mb-4">
            <h3 className="text-md font-medium text-purple-600">ご褒美</h3>
            <p className="text-gray-700">{step.reward}</p>
          </div>
          <div className="flex space-x-4">
            <div>
              <h4 className="text-sm font-medium text-purple-400">期限</h4>
              <p className="text-gray-700">
                {new Date(step.deadLine).toLocaleString()}
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-purple-400">残り時間</h4>
              <Time deadLine={new Date(step.deadLine)} />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-purple-400">達成日時</h4>
            <p className="text-gray-700">
              {step.clearTime === "1970-01-01T00:00:00.000Z"
                ? "未達成"
                : new Date(step.clearTime).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsSection;
