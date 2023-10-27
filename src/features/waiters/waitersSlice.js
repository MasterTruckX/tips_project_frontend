import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import waitersService from "./waitersService"

const initialState = {
    waiters: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const  createWaiter = createAsyncThunk('waiters/create', async(waiterData, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await waitersService.createWaiter(waiterData,token)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const waitersSlice = createSlice({
    name: 'waiter',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createWaiter.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createWaiter.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.waiters.push(action.payload)
                // state.dates = action.payload
            })
            .addCase(createWaiter.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = waitersSlice.actions
export default waitersSlice.reducer