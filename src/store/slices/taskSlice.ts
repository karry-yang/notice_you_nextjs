import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { taskApi } from "@/api/taskApi";
import { Task } from "@/types/modelType/Task";
import { AxiosError } from "axios";
// 定义任务状态
interface TaskState {
  tasks: Task[];
  previousTasks: Task[]; // 用于回滚
  loading: boolean;//加载状态
  error: string | null;//错误信息
  currentTask: Task | null;//当前任务
}

const initialState: TaskState = {
  tasks: [],
  previousTasks: [],
  loading: false,
  error: null,
  currentTask: null,
};



// 异步Thunks
// export const fetchTasks = createAsyncThunk('tasks/fetchAll', async () => {
//   const response = await taskApi.get('/tasks');
//   return response.data;
// });

// 异步获取任务,并在失败时回滚
export const fetchTasks = createAsyncThunk<
  Task[],
  void,
  { rejectValue: string }
>(
  "task/fetchTasks",
  /**
   * @description createAsyncThunk 会自动生成 3 种 action，并且 Redux Toolkit 会自动触发这些 action：pending\fulfilled\rejected
    createAsyncThunk<返回值类型, 参数类型, thunkAPI 选项>(
    "action 类型",
    async (参数, { getState, dispatch, rejectWithValue }) => { ... }
);
   * @param _ 这里是 参数类型（本例中是 void,所以没用）
     @param { getState,dispatch,rejectWithValue, extra,signal} 第二个参数（对象）：Redux Toolkit 自动注入,包含：
    getState()：获取 Redux state
    dispatch(action)：手动 dispatch 其他 action
    rejectWithValue(error)：返回自定义错误信息
    extra：额外参数（extraReducers 可能用到）
    requestId：异步请求的 ID
    signal：AbortController 的 signal,用于取消请求
   */
  async (_, { rejectWithValue }) => {
    try {
      return await taskApi.getAll();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        // 确保 error 是 AxiosError 类型
        const errorMessage = error.response?.data?.message || "获取任务失败";
        return rejectWithValue(errorMessage); // 处理 Axios 错误并返回信息
      }
      return rejectWithValue("获取任务失败");
    }
  }
);
export const createTask = createAsyncThunk('tasks/create', async (taskData: Omit<Task, 'id' | 'createdAt'>) => {
  const response = await taskApi.add(taskData);
  return response;
});

export const updateTask = createAsyncThunk('tasks/update', async ({ id, updates }: { id: number; updates: Partial<Task> }) => {
  const response = await taskApi.update( id, updates );
  return response;
});

export const deleteTask = createAsyncThunk('tasks/delete', async (id: number) => {
  await taskApi.delete(id);
  return id;
});


// 创建任务 Slice
const taskSlice = createSlice({
  name: "task",
  initialState,
  //同步
  reducers: {
    setCurrentTask: (state, action: PayloadAction<Task | null>) => {
      state.currentTask = action.payload;
    },
    clearTasks: () => initialState,
  },
  //异步
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        // 1 先保存当前数据,防止失败后无数据可回滚
        state.previousTasks = [...state.tasks];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        //  请求成功,更新 tasks,清空 previousTasks
        state.tasks = action.payload;
        state.previousTasks = [];
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        //  请求失败,回滚到之前的任务列表
        console.error("获取任务失败:", action.payload);
        state.tasks = state.previousTasks;
        state.previousTasks = []; // 清空 previousTasks
      })
      // createTask
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      
      // updateTask
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(task => task.task_id === action.payload.task_id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        if (state.currentTask?.task_id === action.payload.task_id) {
          state.currentTask = action.payload;
        }
      })
      
      // deleteTask
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.task_id !== action.payload);
      });
  },
});

// 导出 actions 和 reducer
export const {setCurrentTask,clearTasks } = taskSlice.actions;
export default taskSlice.reducer;
