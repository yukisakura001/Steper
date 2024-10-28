// Main.tsx
import Card from "../components/Card";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { GoalType, StepType } from "@/types";
import Head from "next/head";
import StepList from "./StepList";

const Main = () => {
  const [cards, setCards] = useState<GoalType[]>([]);
  const [steps, setSteps] = useState<StepType[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const goalResponse = await apiClient.get("/posts/goals_get");
        const stepList = await apiClient.get("/posts/steps_list");
        if (goalResponse.data.length === 0) {
          return;
        }
        setCards(goalResponse.data);
        setSteps(stepList.data);
      } catch (error) {
        console.error("データ取得エラー:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Head>
        <title>目標一覧</title>
      </Head>
      <section className="text-gray-600 body-font">
        <div className="container sm:px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              目標一覧
            </h1>
          </div>
          <div className="flex flex-wrap -m-4 sm:justify-normal justify-center">
            {cards.map((card) => (
              <Card key={card.id} card={card} />
            ))}
          </div>
          <Link
            href="/goalSet"
            className="flex justify-center mx-auto mt-16 text-white bg-purple-500 border-0 py-2 px-8 focus:outline-none hover:bg-purple-600 rounded-lg shadow-lg transition duration-300 ease-in-out w-auto"
          >
            目標追加
          </Link>
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center mt-20">
            <h2 className="sm:text-3xl text-xl font-medium title-font text-gray-900">
              直近のステップ
            </h2>
          </div>
          <div className="container px-5 mx-auto">
            <div className="flex flex-wrap -mx-4 -my-8">
              {steps?.map((step, index) => {
                const associatedGoal = cards.find(
                  (goal) => goal.id === step.goalId
                );
                return (
                  <div key={step.id} className="py-8 px-4 lg:w-1/3">
                    <StepList
                      stepIndex={index + 1} // 新しいプロップ名を使用
                      content={step.content}
                      deadLine={step.deadLine}
                      rewards={step.reward}
                      goal={associatedGoal?.content ?? "目標が見つかりません"}
                      goalId={step.goalId}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
