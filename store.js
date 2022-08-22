import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})