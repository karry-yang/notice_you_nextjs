"use client";
import { redirect } from "next/navigation";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Flex } from "antd";
import Icon from "@/components/MyIcon";
// import { useState } from "react";
// 登录方法
// const handleRegister = () => {
//   redirect("/register");
// };
// 返回首页
const handleHome = () => {
  redirect("/index");
};
//跳转注册

//定义提交的参数结构
type FormValues = {
  username: string;
  password: string;
};
export default function Login() {
  //   const { login } = useAuth(); // 获取 login 函数
  //   const [isShowQuickLoginBox, setIsShowQuickLoginBox] = useState(false);
  //   const [isAgree, setIsAgree] = useState(false);
  //   const [rememberMe, setRememberMe] = useState(false);
  //展示二维码登录
  // const handleShowQuickLoginBox = () => {
  //   setIsShowQuickLoginBox(true);
  // };
  // 同意协议
  // const agreeHandle = () => {
  //   setIsAgree(!isAgree);
  // };
  //记住我
  // const rememberHandle = () => {
  //   setRememberMe(!rememberMe);
  // };
  //展示表单登录
  // const handleShowLoginFrom = () => {
  //   setIsShowQuickLoginBox(false);
  // };
  //提交表单
  const onFinish = async (values:FormValues) => {
    console.log(values);
    console.log(values.username);
    // await login(values.username, values.password, rememberMe);
  };

  return (
    <div className="box-border w-screen h-screen relative">
      {/* Logo 区域 */}
      <div className="w-screen flex justify-between pt-3">
        <div className="w-52 ml-2">
          <svg
            width="163"
            height="32"
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

        <div className="flex mr-3 items-center">
          <span className="text-blue-300">了解更多?</span>
          <Button type="primary" onClick={handleHome}>
            首页
          </Button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-gray-200 w-96 p-6 rounded-lg shadow-md">
          <div className="text-blue-600 font-bold text-lg text-center mb-4">
            <h1>自律生活||高效工作||高效学习</h1>
          </div>
          {/* 表单 */}
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 660 }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="space-between" align="center">
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <a href="http://localhost:3000/forget">忘记密码</a>
              </Flex>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                登 录
              </Button>
              <div className="flex justify-end">
                <a href="http://localhost:3000/register">立即注册</a>
              </div>
            </Form.Item>
          </Form>
          <div className="flex justify-center w-full gap-4">
            <Button
              icon={<Icon type="icon-github" />}
              className="w-1/5"
            ></Button>
            <Button
              icon={<Icon type="icon-weixin" />}
              className="w-1/5"
            ></Button>
            <Button icon={<Icon type="icon-QQ" />} className="w-1/5"></Button>
          </div>
        </div>
      </div>
    </div>
  );
}
