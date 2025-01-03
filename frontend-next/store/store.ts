import { configureStore } from '@reduxjs/toolkit'
import jobReducer from './slices/job.slice'
import userReducer from './slices/user.slice'
import applicationReducer from './slices/application.slice'
import updateprofileReducer from './slices/update-profile.slice'

export const store = configureStore({
  reducer: {
    jobs: jobReducer,
    user: userReducer,
    application: applicationReducer,
    updateProfile: updateprofileReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch