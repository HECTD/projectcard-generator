

import type { Metadata } from "next";
import { Noto_Sans_JP, JetBrains_Mono } from "next/font/google";

import { UIProvider } from "@yamada-ui/react";
import { theme } from "@/theme";

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "Project Card Generator",
  description: "パンフレット用の企画カードを生成",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${jetBrainsMono.variable} `}
      >
        <UIProvider theme={theme}>{children}</UIProvider>
      </body>
    </html>
  );
}
