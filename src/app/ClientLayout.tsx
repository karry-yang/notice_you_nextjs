// app/ClientLayout.tsx
"use client";

import { useState } from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, ConfigProvider, theme, Switch } from "antd";
import { useRouter, usePathname } from "next/navigation";
import Icon from "@/components/Icon";

import lightTheme from "@/theme/lightTheme";
import darkTheme from "@/theme/darkTheme";
const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

//定义路由菜单项

const items: MenuProps["items"] = [
  {
    key: "/",
    icon: <Icon type="icon-mulu" />,
    label: "Home",
  },
  {
    key: "/task",
    icon: <Icon type="icon-mulu" />,
    label: "Task",
  },
];

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  //检查是否登录
  //定义导航点击事件
  // 处理菜单点击事件
  const router = useRouter(); // 获取路由对象
  const pathname = usePathname(); // 获取当前路由路径

  const handleMenuClick: MenuProps["onClick"] = (e) => {
    router.push(e.key); // 跳转到对应路由
  };
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };
  //实现路由记忆

  // 定义需要隐藏导航栏的路由
  const hideNavbarRoutes = ["/not-found", "/login", "/signup"];

  // 检查当前路由是否需要隐藏导航栏
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <ConfigProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Layout hasSider>
        {/* 根据路由决定是否显示 Sider */}
        {!shouldHideNavbar && (
          <Sider style={siderStyle}>
            <div className="demo-logo-vertical" />
            <Menu
              mode="inline"
              selectedKeys={[pathname]} // 根据当前路由高亮菜单项
              onClick={handleMenuClick} // 绑定点击事件
              items={items}
            />
          </Sider>
        )}
        <Layout>
          {/* Header 可以根据需要隐藏或显示 */}
          {!shouldHideNavbar && (
            <Header style={{ padding: 0, background: colorBgContainer, display:"flex", flexDirection:"row-reverse"}}>
              <Switch
                checkedChildren="light"
                unCheckedChildren="dark"
                defaultChecked
                onChange={toggleTheme}
              />
              {/* 判断是否登录  登录不显示登录按钮   未登录显示登录 */}

            </Header>
          )}

          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              style={{
                padding: 24,
                textAlign: "center",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              {/* 内容区域 */}
              <div>{children}</div>
            </div>
          </Content>

          {/* Footer 可以根据需要隐藏或显示 */}
          {!shouldHideNavbar && (
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
          )}
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
