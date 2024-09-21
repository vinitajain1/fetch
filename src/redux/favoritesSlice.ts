import { createSlice } from "@reduxjs/toolkit";
import { FavoritesState } from "../types/types";

const initialFavoritesState:FavoritesState = {
    dogs:[]
}
const favoritesSlice = createSlice({
    name:"favoritesSlice",
    initialState: initialFavoritesState,
    reducers:{
        toggleDogFromFavoriteList:(state,action)=>{
            if(action.payload){
                const dogIndex = state.dogs.findIndex((dog)=>dog.id === action.payload.id);
                if(dogIndex===-1){
                    state.dogs.push(action.payload);
                }else{
                    state.dogs.splice(dogIndex,1);
                }
            }
        },
    }

});

export const {toggleDogFromFavoriteList} = favoritesSlice.actions;

export default favoritesSlice.reducer;