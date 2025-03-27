import { TaskItem } from '../types/TaskItem'; 
export const Tasks: TaskItem[] = [
  {
    task_id: 1,
    task_name: '完成项目原型设计',
    task_status: 'in_progress',
    created_at: '2023-05-01',
    deadline: '2023-05-15',
    priority: 'high'
  },
  {
    task_id: 2,
    task_name: '编写单元测试',
    task_status: 'todo',
    created_at: '2023-05-02',
    deadline: '2023-05-20',
    priority: 'medium'
  },
  {
    task_id: 3,
    task_name: '部署到生产环境',
    task_status: 'done',
    created_at: '2023-04-28',
    deadline: '2023-05-10',
    priority: 'critical'
  }
];

// 按状态筛选的快捷方法
export const getTasksByStatus = (status: string) => {
  return Tasks.filter(task => task.task_status === status);
};