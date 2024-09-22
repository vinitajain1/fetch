import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice, { AuthState } from "./authSlice";
import dogsSlice, { initialState } from "./dogsSlice";
import favoritesSlice from "./favoritesSlice";
import { AppState, FavoritesState, NotificationSnackbarState } from "../types/types";
import notificationSnackbarSlice from "./notificationSnackbarSlice";

export interface RootStoreState {
    authSlice:AuthState;
    dogsSlice: AppState;
    favoritesSlice: FavoritesState;
    notificationSnackbarSlice:NotificationSnackbarState;
}

const appReducer = combineReducers({
    authSlice,
    dogsSlice,
    favoritesSlice,
    notificationSnackbarSlice
});

const rootReducer = (state: any, action: any) => {
    if (action.type === "logout") {
      state = initialState;
    }
  
    return appReducer(state, action);
  };

export function setupStore(preloadedState?: Partial<RootStoreState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']


export default setupStore