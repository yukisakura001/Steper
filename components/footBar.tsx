import React from "react";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Link from "next/link";

export default function FootBar() {
  return (
    <footer className="text-gray-600 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">
          © 2024 Steper
        </p>
        {/* 利用規約とプライベートポリシーへのページ追加 */}
        <nav className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start space-x-4">
          <Link
            href="/rulePage"
            className="text-purple-500 hover:text-purple-700 focus:outline-none focus:underline"
          >
            利用規約
          </Link>
          <Link
            href="/privatePage"
            className="text-purple-500 hover:text-purple-700 focus:outline-none focus:underline"
          >
            プライバシーポリシー
          </Link>
        </nav>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a href="https://github.com/yukisakura001/Steper">
            <FaGithub className="text-3xl" />
          </a>
          <a href="https://x.com/yukisakura001">
            <FaXTwitter className="text-3xl" />
          </a>
        </span>
      </div>
    </footer>
  );
}
