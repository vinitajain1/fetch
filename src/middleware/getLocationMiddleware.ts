import { UpdateDogLocationPayload } from "../types/action-types";
import { updateDogLocation, fetchingResponseFailed } from "../redux/dogsSlice";
import { AppDispatch, RootStoreState } from "../redux/store";
import { MAIN_URL } from "../utils/utilities";
import filterDogsMiddleware from "./filterDogsMiddleware";

const getLocationMiddleware = ()=>async(dispatch:AppDispatch,getState: () => RootStoreState)=>{
    try{
        let searchURL = `${MAIN_URL}/locations`;
        const zipCodes = getState().dogsSlice.dogs.map((dog)=>dog.zip_code);
        const locationsRes = await fetch(searchURL,{credentials:"include",method:'POST',body:JSON.stringify(zipCodes),headers:
            {
                "Content-type":"application/json"
            }
        });
        const locations:UpdateDogLocationPayload = await locationsRes.json();
        dispatch(updateDogLocation(locations));
    }catch(e){
        dispatch(fetchingResponseFailed(e));
    }
}

export default getLocationMiddleware