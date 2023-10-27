import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import dateReducer from '../features/date/dateSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        date: dateReducer
    }
})