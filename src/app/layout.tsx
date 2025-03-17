// app/layout.tsx
'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import React from 'react';
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Menu, ConfigProvider, theme } from 'antd';
import { metadata } from './metadata'; // 导入拆分后的 metadata

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: 'thin',
  scrollbarGutter: 'stable',
};

const items: MenuProps['items'] = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  CloudOutlined,
  AppstoreOutlined,
  TeamOutlined,
  ShopOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: `nav ${index + 1}`,
}));

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
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#1890ff',
              borderRadius: 8,
            },
          }}
        >
          <Layout hasSider>
            <Sider style={siderStyle}>
              <div className="demo-logo-vertical" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={items}
              />
            </Sider>
            <Layout>
              <Header style={{ padding: 0, background: colorBgContainer }} />
              <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                <div
                  style={{
                    padding: 24,
                    textAlign: 'center',
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                  }}
                >
                  {/* 内容区域 */}
                  <div>{children}</div>
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
        </ConfigProvider>
      </body>
    </html>
  );
}