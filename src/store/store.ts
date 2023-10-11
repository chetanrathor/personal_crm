import { configureStore } from "@reduxjs/toolkit";
import { crmReducer } from "../feature/crm/state/crm-slice";
import { alertReducer } from "../feature/crm/state/alert-slice";
import { modalReducer } from "../feature/crm/state/modal-slice";
import { loaderReducer } from "../feature/crm/state/loader.slice";
import { pagination } from "../feature/crm/state/pagination-slice";

export const store = configureStore({
    reducer: {
        crmReducer: crmReducer,
        alertReducer: alertReducer,
        modalReducer: modalReducer,
        loaderReducer: loaderReducer,
        pagination:pagination
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch