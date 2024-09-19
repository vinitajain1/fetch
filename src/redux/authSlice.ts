import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AuthState{
    user:User | null
    status:'logout' | 'loading' | 'loggedin' | 'failed'
    error: string | null
}

export interface User{
    name:string,
    email:String
}

const initialState:AuthState = {
    user: null,
    status:'logout',
    error: null
}

const authSlice = createSlice({
    name: "authSlice",
    initialState:initialState,
    reducers:{
        loginStart:(state:AuthState)=>{
            state.status = "loading"
        },
        loginSuccess:(state:AuthState,action:PayloadAction<User>)=>{
            state.status = "loggedin";
            state.user = action.payload
        },
        loginError:(state:AuthState,action:PayloadAction<string>)=>{
            state.status = "failed";
            state.error = action.payload
        },
        logout:(state:AuthState)=>{
            state.status = "logout";
            state.user = null;
            state.error = null
        },
    }
});

export const {loginStart,loginSuccess,loginError,logout} = authSlice.actions;
export default authSlice.reducer;