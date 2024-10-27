import React from "react";
import { GiMuscleUp, GiStairsGoal } from "react-icons/gi";
import { FaToolbox } from "react-icons/fa";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { LuGoal } from "react-icons/lu";
import { PiStepsDuotone } from "react-icons/pi";

const HomePage = () => {
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <h1 className="sm:text-3xl text-2xl font-medium title-font text-center text-gray-900 mb-20">
            目標達成をサポートするアプリ
            <br className="hidden sm:block" />
            「Steper」
          </h1>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-purple-700 mb-4 flex-shrink-0">
                <GiMuscleUp className="text-3xl" />
              </div>
              <div className="flex-grow pl-6">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  めんどくさがりの人でも続けられる
                </h2>
                <p className="leading-relaxed text-base">
                  このアプリ必要最低限の入力で目標を設定でき、またモチベーションを維持するための機能も充実しています。
                </p>
              </div>
            </div>

            <div className="p-4 md:w-1/3 flex">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-purple-700 mb-4 flex-shrink-0">
                <FaToolbox className="text-3xl" />
              </div>
              <div className="flex-grow pl-6">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  あなたにあったやり方をサポート
                </h2>
                <p className="leading-relaxed text-base">
                  あなたにあったやり方・ツールにこのアプリを加えることで、より効果的に目標達成をサポートします。
                </p>
              </div>
            </div>

            <div className="p-4 md:w-1/3 flex">
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-purple-700 mb-4 flex-shrink-0">
                <IoPhonePortraitOutline className="text-3xl" />
              </div>
              <div className="flex-grow pl-6">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                  様々な端末から使用可能
                </h2>
                <p className="leading-relaxed text-base">
                  こちらは全機能がWeb上で完結しており、スマホやタブレット、パソコンなど様々な端末から利用可能です。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font mt-10">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-purple-700 flex-shrink-0">
              <LuGoal className="text-7xl" />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                はじめに目標を設定しよう
              </h2>
              <p className="leading-relaxed text-base">
                まず最初は自分の目指す目標を具体的に設定します。
                <br />
                この際、絶対厳守の期限日と達成したときの自分の姿や状況も一緒に設定しましょう。
              </p>
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto border-b pb-10 mb-10 border-gray-200 sm:flex-row flex-col">
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                ステップ(段階)を刻もう
              </h2>
              <p className="leading-relaxed text-base">
                目標が決まったら、その目標を達成するためのステップを設定します。
                <br />
                ステップに設定するのは今まで努力した過程ではなく、努力の結果何ができるようになるかを具体的に設定しましょう。
                <br />
                このアプリではステップ達成のご褒美も設定することで、モチベーションを維持します。
              </p>
            </div>
            <div className="sm:w-32 sm:order-none order-first sm:h-32 h-20 w-20 sm:ml-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-purple-700 flex-shrink-0">
              <PiStepsDuotone className="text-7xl" />
            </div>
          </div>
          <div className="flex items-center lg:w-3/5 mx-auto sm:flex-row flex-col">
            <div className="sm:w-32 sm:h-32 h-20 w-20 sm:mr-10 inline-flex items-center justify-center rounded-full bg-indigo-100 text-purple-700 flex-shrink-0">
              <GiStairsGoal className="text-7xl" />
            </div>
            <div className="flex-grow sm:text-left text-center mt-6 sm:mt-0">
              <h2 className="text-gray-900 text-lg title-font font-medium mb-2">
                目標達成に向けて行動しよう
              </h2>
              <p className="leading-relaxed text-base">
                目標とステップを設定したら、あとはそのステップを達成するために行動するだけです。
                <br />
                目標を目指す過程でどうしても行動が続かないときは、ステップをより細かく刻んで見ましょう。
                <br />
                少しずつでもステップを達成していくことで、あなたのできることはどんどん増えていきます。
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
