import { configureStore } from '@reduxjs/toolkit'
import taskSlice from './slices/taskSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      employees: taskSlice
    }
  })
}