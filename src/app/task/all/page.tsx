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

  //首先统一加载个人任务数据
  //并行统一加载个人标签数据+个人清单数据

  useEffect(() => {
    console.log(value);
  });
  return (
    <div className="h-full w-full">
      <Splitter
        style={{ height: "100%", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        <Splitter.Panel defaultSize={"13%"} min={100} max={150}>
          <div className="">
            任务分类
            <ul>
              <li></li>
            </ul>
          </div>
        </Splitter.Panel>
        <Splitter.Panel defaultSize={"22%"} min={250} max={300}>
          <TaskList items={Tasks} renderItem={(item) => <TaskLi {...item} />} />
        </Splitter.Panel>
        {/* 任务详情 */}
        <Splitter.Panel defaultSize={"65%"} min={300}>
          <div>
            <h3>任务详情</h3>
          </div>
          <div>
            <div className="flex justify-between w-full m-0 p-0">
              <div className="flex w-1/2">
                <MyIcon type="icon-check"></MyIcon>
                <div>date</div>
              </div>
             
              <div className="w-1/2 flex  flex-row-reverse"><MyIcon type="icon-xiaoqizi"/></div>
            </div>
            <div>
              <Slate editor={editor} initialValue={value} onChange={setValue}>
                {/* 编辑按钮组件 */}
                <EditorBar />
                {/* 内容区域 */}
                <Editable
                  renderLeaf={RenderLeaf}
                  renderElement={RenderElement}
                  placeholder="输入内容..."
                  style={{
                    minHeight: "200px",
                    padding: "10px",
                    border: "1px solid #ddd",
                  }}
                />
              </Slate>
            </div>
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
}
