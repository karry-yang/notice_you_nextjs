"use client";
import { useState, useMemo, useEffect } from "react";
import { Splitter } from "antd";
import TaskList from "@/components/TaskList";
import TaskLi from "@/components/TaskLi";
import TaskDetail from "@/components/TaskDetail";
import { Tasks } from "@/mock/task";
import { Descendant, createEditor } from "slate"; // 从 slate 库导入 Descendant 类型
import { Slate, Editable, withReact } from "slate-react";
import { initialValue } from "@/mock/slate";
import EditorBar from "@/components/EditorBar";
import RenderElement from "@/components/RenderElement";
import RenderLeaf from "@/components/RenderLeaf";
import MyIcon from "@/components/MyIcon";
import { useSelector, useDispatch } from "react-redux";
export default function Task() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  // 设置slatebar可见性
  const [slateBarVisible, setSlateBarVisible] = useState(false);
  //首先统一加载个人任务数据  从indexedb中获取，如果没有则重新发起请求
  //并行统一加载个人标签数据+个人清单数据
  //渲染任务分类
  //首先打开all并且打开all下的tasklist
  //任务详情组件制空
  //分类按钮  点击页面跳转 布局不变
  useEffect(() => {
    console.log(value);
  });
  return (
    <div className="h-full w-full">
      <Splitter
        style={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        {/* 任务分类  基本分类  all   today... tag  listicle*/}
        <Splitter.Panel defaultSize={"15%"} min={100}>
          <div className="">
            <ul>
              <li></li>
            </ul>
          </div>
        </Splitter.Panel>
        {/* 任务列表 */}
        <Splitter.Panel defaultSize={"35%"} min={250}>
          <TaskList items={Tasks} renderItem={(item) => <TaskLi {...item} />} />
        </Splitter.Panel>
        {/* 任务详情 */}
        <Splitter.Panel
          defaultSize={"50%"}
          min={500}
          className="h-full flex-col "
        >
          <TaskDetail></TaskDetail>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}
