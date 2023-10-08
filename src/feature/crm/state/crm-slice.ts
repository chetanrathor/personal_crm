import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AddHumanResource, AddNewEmail, CreateNewHumanResourceResponse, CrmSliceInitialState, GetAllHumanResouces } from "../../types"
import { addHumanResource, addNewEmail, getAllHumanResources, getHumanResource } from "../api"
import { AxiosError } from "axios"

export const initialState = {
    humanResources: [],
} as unknown as CrmSliceInitialState

export const addNewHumanResource = createAsyncThunk('crm/addNewHumanResource', async (data: AddHumanResource, { rejectWithValue }) => {

    try {
        const response = await addHumanResource(data)
        return response.data
    } catch (error:any) {
        console.log('error', error.response)
        return rejectWithValue(error.response.data)
    }


})
export const fetchAllHumanResources = createAsyncThunk('crm/fetchAllHR', async (data: GetAllHumanResouces, { rejectWithValue }) => {

    try {
        const response = await getAllHumanResources(data)
        return response.data
    } catch (error) {
        throw rejectWithValue(error)
    }


})
export const fetchHumanResource = createAsyncThunk('crm/humanResourceId', async (id: string, { rejectWithValue }) => {

    try {
        const response = await getHumanResource(id)
        return response.data
    } catch (error) {
        throw rejectWithValue(error)
    }


})
export const createNewEmail = createAsyncThunk('personalized-email/add', async (data: AddNewEmail, { rejectWithValue }) => {

    try {
        const response = await addNewEmail(data)
        return response.data
    } catch (error) {
        throw rejectWithValue(error)
    }


})

export const crmSlice = createSlice({
    name: 'crm/slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllHumanResources.fulfilled, (state, { payload }) => {
            
            return { ...state, humanResources: payload.response.rows }
        })
    }
})

export const crmReducer = crmSlice.reducer
export const { } = crmSlice.actions