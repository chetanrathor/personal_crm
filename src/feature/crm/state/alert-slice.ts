import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AddHumanResource, AddNewEmail, CreateNewHumanResourceResponse, CrmSliceInitialState, GetAllHumanResouces } from "../../types"
import { addHumanResource, addNewEmail, getAllHumanResources, getHumanResource } from "../api"
import { addNewHumanResource, fetchAllHumanResources } from "./crm-slice"

type AlertColor = 'success' | 'info' | 'warning' | 'error';


export const initialState = {
    isVisble: false,
    message: '',
    alertType: 'success'
}

// export const addNewHumanResource = createAsyncThunk('crm/addNewHumanResource', async (data: AddHumanResource, { rejectWithValue }) => {

//     try {
//         const response = await addHumanResource(data)
//         return response.data
//     } catch (error) {
//         throw rejectWithValue(error)
//     }


// })
// export const fetchAllHumanResources = createAsyncThunk('crm/fetchAllHR', async (data: GetAllHumanResouces, { rejectWithValue }) => {

//     try {
//         const response = await getAllHumanResources(data)
//         return response.data
//     } catch (error) {
//         throw rejectWithValue(error)
//     }


// })
// export const fetchHumanResource = createAsyncThunk('crm/humanResourceId', async (id: string, { rejectWithValue }) => {

//     try {
//         const response = await getHumanResource(id)
//         return response.data
//     } catch (error) {
//         throw rejectWithValue(error)
//     }


// })
// export const createNewEmail = createAsyncThunk('personalized-email/add', async (data: AddNewEmail, { rejectWithValue }) => {

//     try {
//         const response = await addNewEmail(data)
//         return response.data
//     } catch (error) {
//         throw rejectWithValue(error)
//     }


// })

export const crmSlice = createSlice({
    name: 'crm/slice',
    initialState,
    reducers: {
        showAlert: (state, action: PayloadAction<boolean>) => {
            return { ...state, isVisble: action.payload }
        },
        hideAlert: (state, action: PayloadAction<boolean>) => {
            return { ...state, isVisble: action.payload }
        }
    },
    extraReducers: (builder) => {
        // builder.addCase(fetchAllHumanResources.fulfilled, (state, { payload }) => {
        //     return { ...state, isVisble: true, message: payload.message }
        // })
        builder.addCase(addNewHumanResource.fulfilled, (state, { payload }) => {
            console.log('payload', payload)
            return { ...state, isVisble: true, alertType: 'success', message: `${payload.message}. ${payload.response.email}` }
        })
        builder.addCase(addNewHumanResource.rejected, (state, action: any) => {
            console.log('payload', action.payload.message)
            return { ...state, isVisble: true, alertType: 'error', message: action.payload?.message }
        })
    }
})

export const alertReducer = crmSlice.reducer
export const { hideAlert, showAlert } = crmSlice.actions