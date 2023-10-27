import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import dateReducer from '../features/date/dateSlice'
import waitersReducer from '../features/waiters/waitersSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        date: dateReducer,
        waiter: waitersReducer
    }
})