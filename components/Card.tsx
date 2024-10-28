import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

const Time = dynamic(() => import("../components/Time"), { ssr: false });

type CardProps = {
  card: { id: number; content: string; deadLine: string; future: string };
};

export default function Card({ card }: CardProps) {
  // deadLineをDateオブジェクトとして取得
  const deadline = new Date(card.deadLine);
  const orizinDate = deadline.toLocaleString();

  // 現在時刻と比較
  const now = new Date();
  const isPast = deadline < now;

  // 条件に応じたクラス名を設定
  const bgColor = isPast ? "bg-orange-100" : "";
  const hoverBgColor = isPast ? "hover:bg-orange-200" : "hover:bg-gray-100";

  return (
    <div key={card.id} className="xl:w-1/3 sm:w-1/2 w-full p-4">
      <Link href={`/steps/${card.id}`}>
        <div
          className={`${bgColor} border border-gray-200 p-6 rounded-lg transition-transform transform hover:scale-105 ${hoverBgColor} cursor-pointer`}
        >
          <h2 className="text-lg text-gray-900 font-medium title-font mb-2 truncate">
            {card.content}
          </h2>
          <p className="text-purple-600 font-medium title-font mb-2 truncatp">
            目標達成時の自分
          </p>
          {/* 期限と未来の自分を表示(複数行可能) */}
          <p className="leading-relaxed text-base whitespace-pre-wrap">
            {card.future}
          </p>
          <p className="leading-relaxed text-base">{orizinDate}</p>
          <Time deadLine={deadline} />
        </div>
      </Link>
    </div>
  );
}
