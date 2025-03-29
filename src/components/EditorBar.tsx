"use client";
import { useSlate } from "slate-react";
import { slateActions } from "@/lib/state-utils"; // 导入统一的操作方法
import MyIcon from "./MyIcon";
import { Dropdown, MenuProps } from "antd"; // 假设使用Ant Design的Dropdown

export default function EditorBar() {
  const editor = useSlate();

  // 标题下拉菜单项配置
  const headingItems: MenuProps["items"] = [
    {
      key: "heading",
      label: "heading",
      onClick: () => slateActions.heading.one(editor),
    },
    {
      key: "heading-two",
      label: "heading-two",
      onClick: () => slateActions.heading.two(editor),
    },
    {
      key: "heading-three",
      label: "heading-three",
      onClick: () => slateActions.heading.three(editor),
    },
  ];
  // 定义工具栏按钮配置
  const toolbarItems = [
    // 全屏（需自行实现）
    {
      key: "full_screen",
      icon: "icon-full_screen",
      label: "全屏",
      onClick: () => slateActions.full_screen(),
    },
    // 文本格式按钮
    {
      key: "bold",
      icon: "icon-bold",
      label: "加粗",
      onClick: () => slateActions.bold(editor),
    },
    {
      key: "italic",
      icon: "icon-italic",
      label: "斜体",
      onClick: () => slateActions.italic(editor),
    },
    {
      key: "underline",
      icon: "icon-underline",
      label: "下划线",
      onClick: () => slateActions.underline(editor),
    },
    {
      key: "strikethrough",
      icon: "icon-strikethrough",
      label: "删除线",
      onClick: () => slateActions.strikethrough(editor),
    },
    {
      key: "code",
      icon: "icon-code",
      label: "代码块",
      onClick: () => slateActions.code(editor),
    },
    {
      key: "light",
      icon: "icon-light",
      label: "高亮",
      onClick: () => slateActions.light(editor),
    },

    // 插入类按钮
    {
      key: "link",
      icon: "icon-link",
      label: "链接",
      onClick: () => {
        const url = prompt("请输入链接URL");
        if (url) slateActions.link(editor, url);
      },
    },
    {
      key: "image",
      icon: "icon-image",
      label: "图片",
      onClick: () => {
        const url = prompt("请输入图片URL");
        if (url) slateActions.image(editor, url);
      },
    },
    {
      key: "file",
      icon: "icon-file",
      label: "文件",
      onClick: () => {
        const url = prompt("请输入文件URL");
        if (url) {
          const fileName = prompt("请输入文件名");
          slateActions.file(editor, url, fileName ?? "未命名文件");
        }
      },
    },

    // 列表按钮
    {
      key: "ul",
      icon: "icon-ul",
      label: "无序列表",
      onClick: () => slateActions.ul(editor),
    },
    {
      key: "ol",
      icon: "icon-ol",
      label: "有序列表",
      onClick: () => slateActions.ol(editor),
    },

    // 块级元素
    {
      key: "quote",
      icon: "icon-quote",
      label: "引用",
      onClick: () => slateActions.quote(editor),
    },
    {
      key: "check",
      icon: "icon-check",
      label: "待办事项",
      onClick: () => slateActions.check(editor),
    },
    {
      key: "time",
      icon: "icon-time",
      label: "时间",
      onClick: () => slateActions.time(editor),
    },

    // 标题下拉菜单

    {
      key: "heading",
      icon: "icon-heading",
      label: "标题",
      onClick: (e: React.MouseEvent) => {
        // 阻止默认点击行为，完全由Dropdown控制
        e.preventDefault();
        e.stopPropagation();
      },
      render: (
        <Dropdown
          menu={{ items: headingItems }}
          trigger={["click"]}
          placement="bottom"
          overlayClassName="editor-heading-dropdown"
        >
          <div className=" hover:bg-gray-600 dark:hover:bg-slate-200 cursor-pointer">
            <MyIcon type="icon-heading" height={10} width={10} />
          </div>
        </Dropdown>
      ),
    },
  ];

  return (
    <div className="w-full flex  items-center h-full bg-slate-500 dark:bg-background-primary px-2 rounded-tl-lg rounded-tr-lg  justify-around">
      {toolbarItems.map((item) => (
        <div
          key={item.key}
          className="  hover:bg-gray-600 dark:hover:bg-slate-200 active:bg-gray-600 dark:active:bg-slate-200 cursor-pointer"
        >
          {item.render || (
            <MyIcon
              type={item.icon}
              height={16}
              width={16}
              onClick={item.onClick}
              //当鼠标悬停时，显示提示信息 item.label
              tooltip={item.label}
              position="top"
            />
          )}
        </div>
      ))}
    </div>
  );
}
