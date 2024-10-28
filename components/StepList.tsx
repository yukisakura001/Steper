// StepList.tsx
import React from "react";
import Time from "./Time";
import Link from "next/link";

interface StepListProps {
  stepIndex: number;
  content: string;
  deadLine: string;
  rewards: string;
  goal: string;
  goalId: number;
}

const StepList: React.FC<StepListProps> = ({
  stepIndex,
  content,
  deadLine,
  rewards,
  goal,
  goalId,
}) => {
  const date = new Date(deadLine);

  const changeColor = () => {
    if (date < new Date()) {
      return "bg-red-200";
    } else {
      return "bg-purple-100";
    }
  };

  return (
    <Link href={`/steps/${goalId}`}>
      <div
        className={`${changeColor()} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 cursor-pointer p-6 flex items-start`}
      >
        <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
          <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
            {stepIndex}
          </span>
        </div>
        <div className="flex-grow pl-6">
          <h2 className="tracking-widest text-xs title-font font-medium text-purple-500 mb-1">
            {goal}
          </h2>
          <h1 className="title-font text-xl font-semibold text-gray-900 mb-3 hover:text-purple-600 transition-colors duration-300">
            {content}
          </h1>
          <div className="mb-3">
            <p className="text-purple-600 font-medium title-font mb-1">報酬</p>
            <p className="text-gray-700 leading-relaxed">{rewards}</p>
          </div>
          <div className="flex items-center mb-2">
            <p className="text-purple-600 font-medium title-font mr-2">
              期限：
            </p>
            <p className="text-gray-700 leading-relaxed">
              {date.toLocaleString()}
            </p>
          </div>
          <div className="flex items-center">
            <p className="text-purple-600 font-medium title-font mr-2">
              残り時間：
            </p>
            <Time deadLine={date} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default StepList;
