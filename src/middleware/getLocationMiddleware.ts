import { UpdateDogLocationPayload } from "../types/action-types";
import { fetchingResponseFailed, updateDogLocation } from "../redux/dogsSlice";
import { AppDispatch, RootStoreState } from "../redux/store";
import { MAIN_URL } from "../utils/utilities";
import { updateSnackBar } from "../redux/notificationSnackbarSlice";
import { Severity } from "../types/types";

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
    }catch(error){
        dispatch(fetchingResponseFailed("error fetching locations of dogs"));
        dispatch(updateSnackBar({open:true,message:"Error fetching location of dogs.Logout and login again",severity:Severity.ERROR}));
    }
}

export default getLocationMiddleware