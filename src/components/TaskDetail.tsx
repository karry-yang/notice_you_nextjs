"use client";

import RenderElement from "@/components/RenderElement";
import RenderLeaf from "@/components/RenderLeaf";
import { Descendant, createEditor } from "slate"; // 从 slate 库导入 Descendant 类型
import MyIcon from "@/components/MyIcon";
import { Slate, Editable, withReact } from "slate-react";
import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import EditorBar from "@/components/EditorBar";
import { initialValue } from "@/mock/slate";
// import { useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  setCurrentTask,
  clearTasks,
} from "@/hooks/useTasks";
import { AppDispatch, RootState } from '@/store/store';
// 数据流程：参数获取从redux中获取 外部组件更改CurrentTask的时候触发渲染

export default function TaskDetail() {
  // const dispatch = useDispatch<AppDispatch>();
  //首先indexed中获取 else从redux中获取currenttask
  const { currentTask } = useSelector((state: RootState) => state.tasks);
  // 自动获取任务列表
  // useEffect(() => {
  //   dispatch(fetchTasks());
  // }, [dispatch]);
  const editor = useMemo(() => withReact(createEditor()), []);
  const [value, setValue] = useState<Descendant[]>(initialValue);
  // 设置slatebar可见性
  const [slateBarVisible, setSlateBarVisible] = useState(false);
  return (
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
      <div className="w-full flex-1 flex flex-col" style={{ height: "70%" }}>
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
  );
}
