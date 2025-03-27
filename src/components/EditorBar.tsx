// components/editor/EditorBar.tsx
"use client";
import { useSlate } from "slate-react";
import {
  insertImage,
  insertFile,
  toggleMark,
  wrapLink,
} from "@/lib/state-utils";

import MyIcon from "./MyIcon";
export default function EditorBar() {
  const editor = useSlate();
  //打开折叠
  // 导入工具中定义的方法

  //定义{16}个图标按钮的模板
  /**
   type,
  className = "",
  style,
  onClick,
    */
  const incons = [
    //全屏
    {
      key: "full_screen",
      type: "icon-full_screen",
      icon: "icon-full_screen",
    },
    { key: "bold", type: "icon-bold", icon: "icon-bold" }, //加粗
    { key: "italic", type: "icon-italic", icon: "icon-italic" }, //斜体
    { key: "underline", type: "icon-underline", icon: "icon-underline" }, //下划线
    {
      key: "strikethrough",
      type: "icon-strikethrough",
      icon: "icon-strikethrough",
    }, //删除线
    { key: "code", type: "icon-code", icon: "icon-code" }, //代码
    { key: "link", type: "icon-link", icon: "icon-link" }, //链接
    { key: "image", type: "icon-image", icon: "icon-image" }, //  图片
    { key: "file", type: "icon-file", icon: "icon-file" }, //文件
    { key: "ul", type: "icon-ul", icon: "icon-ul" }, //无序列表
    { key: "ol", type: "icon-ol", icon: "icon-ol" }, //有序列表
    { key: "quote", type: "icon-quote", icon: "icon-quote" }, //引用
    { key: "light", type: "icon-light", icon: "icon-light" }, //添加颜色
    {
      key: "heading",
      type: "icon-heading",
      icon: "icon-heading",
      Children: [
        { key: "heading", type: "icon-heading-one", icon: "icon-heading-one" }, //标题1
        {
          key: "heading-two",
          type: "icon-heading-two",
          icon: "icon-heading-two",
        }, //标题2
        {
          key: "heading-three",
          type: "icon-heading-three",
          icon: "icon-heading-three",
        }, //标题3
        {
          key: "heading-four",
          type: "icon-heading-four",
          icon: "icon-heading-four",
        },
      ],
    }, //标题4
    //检查项目是否完成
    { key: "check", type: "icon-check", icon: "icon-check" },
    //当前时间
    { key: "time", type: "icon-time", icon: "icon-time" },
  ];
  return (
    //悬浮在最上面
    <div className="w-full  flex m-0 p-0 bg-slate-500  dark:bg-background-primary  fixed z-50">
      {incons.map((item) => (
        <div key={item.key} className=" p-1 ">
          <MyIcon
            className=" hover:bg-gray-600 dark:hover:bg-slate-200 active:bg-gray-600 dark:active:bg-slate-200"
            type={item.type}
            height={16}
            width={16}
            onClick={() => console.log(item.key)}
          />
        </div>
      ))}

      {/* 文本格式按钮 */}
      {/* <button onClick={() => toggleMark(editor, 'bold')}>B</button>
      <button onClick={() => toggleMark(editor, 'italic')}>I</button> */}

      {/* 插入链接 */}
      {/* <button
        onClick={() => {
          const url = prompt('输入链接地址:');
          if (url) wrapLink(editor, url);
        }}
      >
        链接
      </button> */}

      {/* 插入图片 */}
      {/* <input
        key:"", type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            insertImage(editor, url);
          }
        }}
      /> */}

      {/* 插入文件 */}
      {/* <input
        key:"", type="file"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            const url = URL.createObjectURL(file);
            insertFile(editor, url, file.name, file key:"",.type.split('/')[1]);
          }
        }}
      /> */}
    </div>
  );
}
