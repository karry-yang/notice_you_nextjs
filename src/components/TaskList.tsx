import React from "react";

interface TaskItem {
  task_id: number;
  task_name: string;
  task_status: string;
}

interface TaskListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

const TaskList = <T extends TaskItem>({ items, renderItem }: TaskListProps<T>) => {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.task_id}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
};


export default TaskList;