// src/services/taskApi.ts
import { Task } from '@/types/modelType/Task';
import { authApiClient } from '@/lib/axiosConfig';

export const taskApi = {
  /**
   * 获取所有任务
   */
  async getAll(): Promise<Task[]> {
    try {
      return await authApiClient.get('/tasks');
    } catch (error) {
      console.error('获取任务列表失败:', error);
      throw error;
    }
  },

  /**
   * 创建新任务
   */
  async add(task: Omit<Task, 'id'>): Promise<Task> {
    try {
      return await authApiClient.post('/tasks', task);
    } catch (error) {
      console.error('创建任务失败:', error);
      throw error;
    }
  },

  /**
   * 更新任务
   */
  async update(id: number, taskData: Partial<Task>): Promise<Task> {
    try {
      return await authApiClient.patch(`/tasks/${id}`, taskData);
    } catch (error) {
      console.error('更新任务失败:', error);
      throw error;
    }
  },

  /**
   * 删除任务
   */
  async delete(id: number): Promise<void> {
    try {
      await authApiClient.delete(`/tasks/${id}`);
    } catch (error) {
      console.error('删除任务失败:', error);
      throw error;
    }
  }
};