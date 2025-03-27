import React from "react";
import  {TaskItem} from "@/types/TaskItem";
const TaskLi: React.FC<TaskItem> = (TaskItem) => {
  return (
    <div>
      {/* 传入list参数 */}
      {/* 可编辑标题 */}
      {/* 展示状态：input
        编辑状态slate
         */}
         <div></div>
      {TaskItem.task_id}
      {TaskItem.task_name}
      {TaskItem.task_status}
    </div>
  );
};
export default TaskLi;
