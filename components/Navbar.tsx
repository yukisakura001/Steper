import React from "react";
import Link from "next/link";
import { useAuth } from "@/context/auth";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-slate-500 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-4xl">
          <Link href="/">Steper</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <button
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  onClick={logout}
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                >
                  ログイン
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                >
                  サインアップ
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
