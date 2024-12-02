import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './slices/job.slice'
import userReducer from './slices/user.slice'

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch