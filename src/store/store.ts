import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './slices/taskSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      tasks: taskSlice
    }
  })
}

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];