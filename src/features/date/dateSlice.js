import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import dateService from "./dateService"

const date = JSON.parse(localStorage.getItem('date'))

const initialState = {
    dates: date ? date : null,
    datesList: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const createDate = createAsyncThunk('date/create', async(dateData,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await dateService.createDate(dateData,token)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getAllDates = createAsyncThunk('date/getAll', async(_,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await dateService.getAllDates(token)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const getDateById = createAsyncThunk('date/getById', async(id,thunkAPI) => {
    try{
        const token = thunkAPI.getState().auth.user.token
        return await dateService.getDateById(id,token)
    }catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const dateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createDate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createDate.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                // state.dates.push(action.payload)
                state.dates = action.payload
            })
            .addCase(createDate.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getAllDates.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllDates.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.datesList = action.payload
            })
            .addCase(getAllDates.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getDateById.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getDateById.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.dates = action.payload
            })
            .addCase(getDateById.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const {reset} = dateSlice.actions
export default dateSlice.reducer