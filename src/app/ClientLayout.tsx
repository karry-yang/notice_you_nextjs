// app/ClientLayout.tsx
"use client";

import MyIcon from "@/components/MyIcon";
import React, { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, Button, ConfigProvider, Switch } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import lightTheme from "@/theme/lightTheme";
import darkTheme from "@/theme/darkTheme";
import { useRouter, usePathname } from "next/navigation";

const { Header, Sider, Content } = Layout;
// 定义需要隐藏导航栏的路由
const hideNavbarRoutes = ["/not-found", "/login", "/register", "/index"];

const items: MenuProps["items"] = [
  {
    key: "/user",
    icon: <MyIcon type="icon-zhanghu" />,
    label: "用户",
  },
  {
    key: "/task",
    icon: <MyIcon type="icon-mulu" />,
    label: "Task",
  },
  {
    key: "/hobit",
    icon: <MyIcon type="icon-mulu" />,
    label: "hobit",
  },
  {
    key: "/focus",
    icon: <MyIcon type="icon-mulu" />,
    label: "Focus",
  },
  {
    key: "/calendar",
    icon: <MyIcon type="icon-mulu" />,
    label: "Calendar",
  },
  {
    key: "/group",
    icon: <MyIcon type="icon-mulu" />,
    label: "Group",
  },
  {
    key: "/message",
    icon: <MyIcon type="icon-mulu" />,
    label: "Message",
  },
  {
    key: "/publish",
    icon: <MyIcon type="icon-mulu" />,
    label: "Publish",
  },
];

//检查是否登录
//定义导航点击事件
// 处理菜单点击事件

//实现路由记忆

import type { ReactNode } from "react";

interface ClientLayoutProps {
  readonly children: ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // 控制主题状态
  const router = useRouter(); // 获取路由对象
  const pathname = usePathname(); // 获取当前路由路径
  // 检查当前路由是否需要隐藏导航栏
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    router.push(e.key); // 跳转到对应路由
  };
  // 切换主题
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark"); // 切换 Tailwind 的 dark 类
  };

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Layout className="h-full flex">
        {/* 左侧 Sider */}
        {!shouldHideNavbar && (
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={(value) => setCollapsed(value)}
            trigger={null}
            width={150}
            collapsedWidth={80}
            className="overflow-auto h-full dark:bg-background-primary bg-slate-50"
          >
            {!collapsed && (
              <div>
                <svg
                  width="120"
                  height="20"
                  viewBox="0 0 163 32"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <text
                    stroke="#9ACEE6"
                    fontWeight="bold"
                    fontStyle="italic"
                    strokeDasharray="5,2,2,2,2,2"
                    opacity="0.86"
                    xmlSpace="preserve"
                    textAnchor="start"
                    fontFamily="sans-serif"
                    fontSize="24"
                    y="24.06015"
                    x="4"
                    fill="#D3BEE7"
                  >
                    NOTICE-YOU
                  </text>
                </svg>
              </div>
            )}
            <Menu
              selectedKeys={[pathname]} // 根据当前路由高亮菜单项
              theme={isDarkMode ? "dark" : "light"} // 根据主题设置 Menu 的主题
              mode="inline"
              items={items}
              onClick={handleMenuClick} // 绑定点击事件
            />
          </Sider>
        )}

        <Layout className="flex-1">
          {!shouldHideNavbar && (
            <Header
              style={{
                padding: 0,
                background: isDarkMode ? "#1a1a1a" : "#ffffff", // 使用 Tailwind 的背景色
                display: "flex",
                justifyContent: "space-between",
                height:"5%"
              }}
            >
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  color: isDarkMode ? "#ffffff" : "#333333", // 使用 Tailwind 的文字颜色
                }}
              />
              <Switch
                checkedChildren="dark"
                unCheckedChildren="light"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
            </Header>
          )}
          {/* Content */}
          <Content
            style={{
              background: isDarkMode ? "#1a1a1a" : "#ffffff", // 使用 Tailwind 的背景色
              minHeight: 280,
              color: isDarkMode ? "#ffffff" : "#333333", // 使用 Tailwind 的文字颜色
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}