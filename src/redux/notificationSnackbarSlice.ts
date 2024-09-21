import { createSlice } from "@reduxjs/toolkit";
import { NotificationSnackbarState, Severity } from "../types/types";
import { ShowSnackbarPayload } from "../types/action-types";

const initialState:NotificationSnackbarState = {
    open: false,
    severity:Severity.INFO,
    message:''
}

const notificationSnackbarSlice = createSlice({
    name:'notificationSnackbarSlice',
    initialState,
    reducers:{
        updateSnackBar:(state,action:{ payload: ShowSnackbarPayload })=>{
            state.open = action.payload.open;
            state.message = action.payload.message;
            state.severity = action.payload.severity;
        }
    }
});

export const {updateSnackBar} = notificationSnackbarSlice.actions;
export default notificationSnackbarSlice.reducer;