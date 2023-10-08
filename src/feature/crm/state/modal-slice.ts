import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AddHumanResource, AddNewEmail, CreateNewHumanResourceResponse, CrmSliceInitialState, GetAllHumanResouces } from "../../types"
import { addHumanResource, addNewEmail, getAllHumanResources, getHumanResource } from "../api"
import { addNewHumanResource, fetchAllHumanResources } from "./crm-slice"



export const initialState = {
    isVisble: false,
    children: 'NewEmail',
    isNewEmail: false
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

export const modalSlice = createSlice({
    name: 'modal/slice',
    initialState,
    reducers: {
        showModal: (state) => {
            return { ...state, isVisble: true }
        },
        hideModal: (state) => {
            return { ...state, isVisble: false }
        },
        setIsNewEmail: (state, action: PayloadAction<boolean>) => {
            return { ...state, isNewEmail: action.payload }
        }
    },
    // extraReducers: (builder) => {
    //     builder.addCase(fetchAllHumanResources.fulfilled, (state, { payload }) => {
    //         return { ...state, isVisble: true, message: payload.message }
    //     })
    //     builder.addCase(addNewHumanResource.fulfilled, (state, { payload }) => {
    //         console.log('payload', payload)
    //         return { ...state, isVisble: true, message: payload.message }
    //     })
    //     builder.addCase(addNewHumanResource.rejected, (state, action: any) => {
    //         console.log('payload', action.payload.message)
    //         return { ...state, isVisble: true, message: action.payload.message }
    //     })
    // }
})

export const modalReducer = modalSlice.reducer
export const { hideModal, showModal,setIsNewEmail } = modalSlice.actions