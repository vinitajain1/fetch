import { toggleDogFromFavoriteList } from "../redux/favoritesSlice";
import { AppDispatch, RootStoreState } from "../redux/store";
import { Dog } from "../types/types";


export const toggleFavoritesMiddleware = (dog:Dog) => async (dispatch: AppDispatch,getState: () => RootStoreState) => {
    dispatch(toggleDogFromFavoriteList(dog));    
};

export default toggleFavoritesMiddleware;