import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "./authSlice";
import dogsSlice, { initialState } from "./dogsSlice";
import favoritesSlice, { FavoritesState } from "./favoritesSlice";
import { AppState } from "../types/types";

export interface RootStoreState {
    authSlice:AuthState
    dogsSlice: AppState;
    favoritesSlice: FavoritesState
}

const appReducer = combineReducers({
    authSlice,
    dogsSlice,
    favoritesSlice
});

const rootReducer = (state: any, action: any) => {
    if (action.type === "logout") {
      state = initialState;
    }
  
    return appReducer(state, action);
  };

const store = configureStore<RootStoreState>({
    reducer:rootReducer
});

export type AppDispatch = typeof store.dispatch;

export default store