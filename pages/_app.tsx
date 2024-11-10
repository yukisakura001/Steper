import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { AuthProvider } from "@/context/auth";
import FootBar from "@/components/footBar";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Head>
        <meta property="og:title" content="Steper" />
        <meta
          property="og:description"
          content="目標達成を応援するwebアプリです。"
        />
        <meta property="og:image" content="" />
        <meta
          property="og:url"
          content="https://steper.vercel.app//icon512_rounded.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Steper" />
        <meta
          name="twitter:description"
          content="目標達成を応援するwebアプリです。"
        />
        <meta
          name="twitter:image"
          content="https://steper.vercel.app//icon512_rounded.png"
        />
      </Head>
      <div>
        <Navbar />
        <Component {...pageProps} />
        <FootBar />
      </div>
    </AuthProvider>
  );
}
