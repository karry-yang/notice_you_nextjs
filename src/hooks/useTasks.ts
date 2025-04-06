// hooks/useTasks.ts
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  fetchTasks, 
  createTask, 
  updateTask, 
  deleteTask,
  setCurrentTask,
  clearTasks
} from '@/store/slices/taskSlice';
import { AppDispatch, RootState } from '@/store/store';
import { Task } from '@/types/modelType/Task';
export const useTasks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error, currentTask } = useSelector((state: RootState) => state.tasks);

  // 自动获取任务列表
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // 创建任务
  const handleCreateTask = async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
    try {
      await dispatch(createTask(taskData)).unwrap();
      return true;
    } catch (err) {
      console.error('Failed to create task:', err);
      return false;
    }
  };

  // 更新任务
  const handleUpdateTask = async (id: number, updates: Partial<Task>) => {
    try {
      await dispatch(updateTask({ id, updates })).unwrap();
      return true;
    } catch (err) {
      console.error('Failed to update task:', err);
      return false;
    }
  };

  // 删除任务
  const handleDeleteTask = async (id: number) => {
    try {
      await dispatch(deleteTask(id)).unwrap();
      return true;
    } catch (err) {
      console.error('Failed to delete task:', err);
      return false;
    }
  };

  // 设置当前选中任务
  const selectTask = (task: Task | null) => {
    dispatch(setCurrentTask(task));
  };

  // 清空任务状态
  const resetTasks = () => {
    dispatch(clearTasks());
  };

  return {
    tasks,
    currentTask,
    loading,
    error,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    selectTask,
    resetTasks,
    refetchTasks: () => dispatch(fetchTasks()),
  };
};