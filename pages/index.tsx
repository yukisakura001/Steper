import Main from "@/components/Main";
import { useAuth } from "@/context/auth";
import HomePage from "./homePage";

export default function Home() {
  const { user } = useAuth();
  return (
    <div>
      {
        //ログインしてればNainコンポーネントを表示
        user ? <Main /> : <HomePage />
      }
    </div>
  );
}
