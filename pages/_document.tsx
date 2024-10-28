import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ja">
      <Head />
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon.png"></link>
      <meta name="theme-color" content="#b8e986" />
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
