import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { AddHumanResource, AddNewEmail, CreateNewHumanResourceResponse, CrmSliceInitialState, GetAllHumanResouces } from "../../types"
import { addHumanResource, addNewEmail, getAllHumanResources, getHumanResource } from "../api"
import { addNewHumanResource, fetchAllHumanResources } from "./crm-slice"

type AlertColor = 'success' | 'info' | 'warning' | 'error';
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

export const initialState = {
    currentPage: 0,
    totalPages: 0,
    limit: 10,
    offset: 0,
    total: 0,
    count:0

}



export const paginationSlice = createSlice({
    name: 'pagination/slice',
    initialState,
    reducers: {
        setState: (state, action: PayloadAction<{ currentPage: number, totalPages: number }>) => {
            return { ...state, ...action.payload }
        },
        setLimit: (state, { payload }: PayloadAction<number>) => {
            return { ...state, limit: payload }
        },
        setOffset: (state, { payload }: PayloadAction<number>) => {
            return { ...state, offset: payload }
        }

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllHumanResources.fulfilled, (state, { payload }) => {
            const { limit, offset, total } = state
            const { count } = payload.response
            console.log('payload', payload.response)
            return {
                ...state,
                currentPage: offset >= count ? -1 : offset / limit + 1,
                totalPages: Math.ceil(count / limit),
                count


            }
        })
        // builder.addCase(addNewHumanResource.fulfilled, (state, { payload }) => {
        //     console.log('payload', payload)
        //     return { ...state, isVisble: true, alertType: 'success', message: `${payload.message}. ${payload.response.email}` }
        // })
        // builder.addCase(addNewHumanResource.rejected, (state, action: any) => {
        //     console.log('payload', action.payload.message)
        //     return { ...state, isVisble: true, alertType: 'error', message: action.payload?.message }
        // })
    }
})

export const pagination = paginationSlice.reducer
export const { setState,setLimit,setOffset } = paginationSlice.actions