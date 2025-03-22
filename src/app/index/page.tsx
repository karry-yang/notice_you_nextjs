"use client";

import { redirect } from "next/navigation";
import {  Button } from "antd";

const handleLogin = () => {
  redirect("/login");
};




export default function Login() {
  //   首页
  return (
    <div className="">
      {/* logo */}
      <div className=" w-screen flex justify-between">
        <div className="w-52">
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

        <div className="flex ">
          {/* 添加点击事件 */}
          <span>还没有账号?</span>
          {/* 添加登录事件 */}
          <Button onClick={handleLogin}>登录</Button>
        </div>
      </div>

      {/* 表单 */}
      <div className="w-full">
       index介绍
      </div>
    </div>
  );
}
