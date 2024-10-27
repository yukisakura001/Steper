import React, { useState } from "react";

const Time = ({ deadLine }: { deadLine: Date }) => {
  function calculateSecondsDifference(targetDate: Date): number {
    // Dateオブジェクトが有効かどうかをチェック
    if (isNaN(targetDate.getTime())) {
      throw new Error("無効なDateオブジェクトです。");
    }

    const now = new Date();
    const diffInMilliseconds = targetDate.getTime() - now.getTime();
    const diffInSeconds = diffInMilliseconds / 1000;
    return diffInSeconds;
  }
  function convertSeconds(totalSeconds: number): string {
    // 入力が数値であり、非負であることをチェック
    if (
      typeof totalSeconds !== "number" ||
      isNaN(totalSeconds) ||
      totalSeconds < 0
    ) {
      totalSeconds = 0;
    }
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor(totalSeconds / 3600 - days * 24);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const time = days + "日" + hours + "時間" + minutes + "分" + seconds + "秒";

    return time;
  }
  //残り秒数を計算する
  const deadLine_m = calculateSecondsDifference(deadLine);
  // カウントとその更新関数をuseState Hookで定義します。
  // 初期値はPropsから受け取った初期カウントです
  const [count, setCount] = useState(deadLine_m);
  // タイマーが動いているかどうかの状態とその更新関数をuseState Hookで定義します。
  // 初期値はfalseです

  // カウントダウンを実行する関数を定義します。
  // カウントが0より大きいとき、カウントを1減らします
  const tick = () => {
    if (count > 0) setCount((prevCount) => prevCount - 1);
  };

  // useEffect Hookを使って、コンポーネントのレンダリング後に実行する処理を設定します
  React.useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;

    // タイマーが動いていて、カウントが0より大きい場合、
    // 1秒ごとにtick関数を実行するタイマーを設定します
    if (count > 0) {
      timerId = setInterval(() => {
        tick();
      }, 1000);
    }

    // クリーンアップ関数を定義します。
    // この関数はコンポーネントがアンマウントされたとき、
    // または依存配列が更新されたときに呼ばれます。ここではタイマーをクリアします
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [count]);
  // 依存配列にisRunningとカウントを指定します。
  // これにより、いずれかが変更されるたびにエフェクトが実行されます

  // カウントと操作ボタンを表示するdiv要素をレンダリングします
  return (
    <div>
      <div>{convertSeconds(count)}</div> {/* 現在のカウントを表示します */}
    </div>
  );
};

export default Time;
