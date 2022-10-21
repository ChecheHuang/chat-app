import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../page/HomePage/userSlice'
export default configureStore({
  reducer: {
    user: userReducer,
  },
})
