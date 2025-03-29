// 模拟API调用
import { TaskItem } from '@/types/modelType/TaskItem'
import { Tasks } from '@/mock/task'
  let nextId = 3
  
  export const taskApi = {
    async getAll() {
      // 模拟网络延迟
      await new Promise(resolve => setTimeout(resolve, 500))
      return Tasks
    },
    
    async add(task: TaskItem) {
      await new Promise(resolve => setTimeout(resolve, 500))
      const newTask = { ...task, id: nextId++ }
      Tasks.push(newTask)
      return newTask
    },
    
    async update(id:number, taskData: Partial<TaskItem>) {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = Tasks.findIndex(e => e.task_id === id)
      if (index !== -1) {
        Tasks[index] = { ...Tasks[index], ...taskData }
        return Tasks[index]
      }
      throw new Error('task not found')
    },
    
    async delete(id:number) {
      await new Promise(resolve => setTimeout(resolve, 500))
      const index = Tasks.findIndex(e => e.task_id === id)
      if (index !== -1) {
        Tasks.splice(index, 1)
        return
      }
      throw new Error('task not found')
    }
  }