export interface Task {
    task_id: number;
    task_name: string;
    task_status: 'todo' | 'in_progress' | 'done' | 'archived';
    created_at: string;
    deadline?: string;
    priority?: 'low' | 'medium' | 'high' | 'critical';
    assignee?: string;
  }