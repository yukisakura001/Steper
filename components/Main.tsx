import Card from "../components/Card";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
import { useEffect, useState } from "react";
import { GoalType } from "@/types";

const Main = () => {
  const [cards, setCards] = useState<GoalType[]>([]);

  useEffect(() => {
    const data = async () => {
      const goalResponse = await apiClient.get("/posts/goals_get");
      if (goalResponse.data.length === 0) {
        return;
      }
      setCards(goalResponse.data);
    };
    data();
  }, []);

  return (
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
      </div>
    </section>
  );
};

export default Main;
