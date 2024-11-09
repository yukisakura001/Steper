import React, { useEffect } from "react";
import apiClient from "@/lib/apiClient";
import { useRouter } from "next/router";

export default function Check() {
  const router = useRouter();
  const { check } = router.query;

  useEffect(() => {
    // クエリパラメータがまだ取得できていない場合は処理を中断
    if (!check) return;

    const verify = async () => {
      try {
        const res = await apiClient.post("/auth/check", {
          verificationToken: check,
        });

        if (res.status === 200) {
          alert("認証完了しました");
          router.push("/login");
        } else {
          alert("認証失敗しました。もう一度登録してください");
          router.push("/signup");
        }
      } catch (e) {
        console.error(e);
        alert("認証失敗しました。もう一度登録してください");
        router.push("/signup");
      }
    };

    verify();
  }, [check, router]);

  return <div>認証中...</div>;
}
