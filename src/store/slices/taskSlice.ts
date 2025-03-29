import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { taskApi } from '@/api/taskApi'
import { TaskItem } from '@/types/modelType/TaskItem'
import { ApiResponse } from '@/types/common/Response'

/**
 * createAsyncThunk<ReturnType, ArgType>\createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>
*/
export const fetchEmployees = createAsyncThunk<TaskItem[],void>(
  'task/fetchAll',
  async () => {
    const response = await taskApi.getAll()
    return response.
  }
)


export const addTask = createAsyncThunk<TaskItem,Omit<TaskItem,"task_id">(
  'task/add',
  async (taskData) => {
    return await taskApi.add(taskData)
  }
)


export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ id, taskData }) => {
    return await taskApi.update(id, taskData)
  }
)


export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id) => {
    await taskApi.delete(id)
    return id
  }
)

const employeeSlice = createSlice({
  name: 'employees',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchEmployees.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      
   
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      
      
      .addCase(updateEmployee.fulfilled, (state, action) => {
        const index = state.items.findIndex(e => e.id === action.payload.id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      
      
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.items = state.items.filter(e => e.id !== action.payload)
      })
  }
})

export default employeeSlice.reducer


export const selectAllEmployees = (state) => state.employees.items
export const selectEmployeeById = (id) => (state) => 
  state.employees.items.find(e => e.id === id)
export const selectEmployeesStatus = (state) => state.employees.status