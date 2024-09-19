import { toggleDogAsFavorite } from "../redux/dogsSlice";
import { toggleDogFromFavoriteList } from "../redux/favoritesSlice";
import { AppDispatch, RootStoreState } from "../redux/store";
import { Dog } from "../types/types";


export const toggleFavoritesMiddleware = (dog:Dog) => async (dispatch: AppDispatch,getState: () => RootStoreState) => {
    dispatch(toggleDogAsFavorite(dog));
    dispatch(toggleDogFromFavoriteList(getState().dogsSlice.dogs.find((dog1)=>dog1.id===dog.id) || dog));    
};

export default toggleFavoritesMiddleware;