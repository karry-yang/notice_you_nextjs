// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import React from "react";
import ClientLayout from "./ClientLayout"; 
// import theme from "@/theme/themeConfig"; // 自定义主题配置
import ReduxProvider from "@/store/ReduxProvider"; // Redux Provider
export const metadata: Metadata = {
  title: "NOTICEYOU",
  description: "自律高效 ",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 引入客户端组件 */}
        <ReduxProvider>
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
      </body>
    </html>
  );
}
