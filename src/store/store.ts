import { configureStore } from "@reduxjs/toolkit";
import { crmReducer } from "../feature/crm/state/crm-slice";
import { alertReducer } from "../feature/crm/state/alert-slice";
import { modalReducer } from "../feature/crm/state/modal-slice";

export const store = configureStore({
    reducer: {
        crmReducer: crmReducer,
        alertReducer: alertReducer,
        modalReducer: modalReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch