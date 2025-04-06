// app/layout.tsx
"use client";
import "../styles/globals.css";
import React from "react";
import ClientLayout from "./CommonClientLayout";
import OneBoxLayOut from "@/layout/OneBoxLayOut";
import ReduxProvider from "@/store/ReduxProvider"; // Redux Provider
import { usePathname } from "next/navigation";

//定义需要使用oneboxlayout路由数组
const oneBoxRouter = [
  "/home",
  "/index",
  "/register",
  "/login",
  "/not-found",
  "/changePassword",
];
/**
 * 1路由选择布局
 * 2: 登录验证
 * 3：首屏数据加载   redux数据保存   indexedb保存
 */
export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isOneBoxLayout = oneBoxRouter.includes(pathname);
  return (
    <>
      {/* 引入客户端组件 */}
      {isOneBoxLayout ? (
        <OneBoxLayOut>{children}</OneBoxLayOut>
      ) : (
        <ReduxProvider>
          <ClientLayout>{children}</ClientLayout>
        </ReduxProvider>
      )}
    </>
  );
}
