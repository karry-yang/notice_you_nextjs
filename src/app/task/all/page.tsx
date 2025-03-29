"use client";
import { useState, useMemo, useEffect } from "react";
import { Splitter } from "antd";
import TaskList from "@/components/TaskList";
import TaskLi from "@/components/TaskLi";
import { Tasks } from "@/mock/task";
import { Descendant, createEditor } from "slate"; // 从 slate 库导入 Descendant 类型
import { Slate, Editable, withReact } from "slate-react";
import { initialValue } from "@/mock/slate";
import EditorBar from "@/components/EditorBar";
import RenderElement from "@/components/RenderElement";
import RenderLeaf from "@/components/RenderLeaf";
import MyIcon from "@/components/MyIcon";
export default function Task() {
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  // 设置slatebar可见性
  const [slateBarVisible, setSlateBarVisible] = useState(false);
  //首先统一加载个人任务数据
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
        <Splitter.Panel defaultSize={"15%"} min={100}>
          <div className="">
            任务分类
            <ul>
              <li></li>
            </ul>
          </div>
        </Splitter.Panel>
        <Splitter.Panel defaultSize={"35%"} min={250}>
          <TaskList items={Tasks} renderItem={(item) => <TaskLi {...item} />} />
        </Splitter.Panel>
        {/* 任务详情 */}
        <Splitter.Panel
          defaultSize={"50%"}
          min={500}
          className="h-full flex-col "
        >
          <div className="flex flex-col w-full h-full  bg-white rounded-lg shadow-md flex-1">
            <div className="flex  justify-between w-full h-1/10 bg-gray-200 px-2">
              <h3>任务详情</h3>
            </div>
            <div className="flex justify-between w-full h-1/10 m-0 p-0">
              <div className="flex w-1/2">
                <MyIcon type="icon-check"></MyIcon>
                <div>date</div>
              </div>

              <div className="w-1/2 flex  flex-row-reverse">
                <MyIcon type="icon-xiaoqizi" />
              </div>
            </div>
            <div
              className="w-full flex-1 flex flex-col"
              style={{ height: "70%" }}
            >
              <Slate editor={editor} initialValue={value} onChange={setValue}>
                {/* 可滚动内容区 */}
                <div className="flex-1 overflow-y-auto ">
                  <Editable
                    renderLeaf={RenderLeaf}
                    renderElement={RenderElement}
                    placeholder="输入内容..."
                  />
                </div>

                {/* 固定在底部的工具栏 */}
                {slateBarVisible && (
                  <div className="sticky bottom-0 z-10">
                    <EditorBar />
                  </div>
                )}
              </Slate>
            </div>
            <div className="flex relative bottom-0 w-full h-1/10 bg-gray-200 items-center px-2">
              {/* 移动到收集箱 */}
              <div className="flex w-4/5 justify-start space-x-2 ">
                <div className=" hover:bg-gray-600 dark:hover:bg-slate-200 active:bg-gray-600 dark:active:bg-slate-200 cursor-pointer">
                  <MyIcon
                    type="icon-choutifenlei"
                    tooltip="放入收集箱"
                    position="top"
                  />
                </div>
              </div>
              <div className="flex w-1/5 justify-around">
                <div className=" hover:bg-gray-600 dark:hover:bg-slate-200 active:bg-gray-600 dark:active:bg-slate-200 cursor-pointer">
                  <MyIcon
                    type="icon-wenbenyangshi"
                    tooltip="文本样式"
                    position="top"
                    onClick={() => {
                      setSlateBarVisible(!slateBarVisible);
                    }}
                  />
                </div>
                <div className=" hover:bg-gray-600 dark:hover:bg-slate-200 active:bg-gray-600 dark:active:bg-slate-200 cursor-pointer">
                  <MyIcon type="icon-xiaoxi" tooltip="评论" position="top" />
                </div>
                <div className=" hover:bg-gray-600 dark:hover:bg-slate-200 active:bg-gray-600 dark:active:bg-slate-200 cursor-pointer">
                  <MyIcon type="icon-gengduo1" tooltip="更多" position="top" />
                </div>
              </div>
            </div>
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}
