import { UpdateZipCodesPayload } from "../types/action-types";
import { fetchingResponseFailed, updateZipCodes } from "../redux/dogsSlice";
import { AppDispatch, RootStoreState } from "../redux/store";
import { MAIN_URL } from "../utils/utilities";
import { Location } from "../types/types";

const getZipCodesMiddleware = ()=>async(dispatch:AppDispatch,getState: () => RootStoreState)=>{
    try{
        let searchURL = `${MAIN_URL}/locations/search`;
        const locationsResponse = await fetch(searchURL,
            {credentials:"include",method:'POST',body:JSON.stringify(getState().dogsSlice.locationSearchParams),headers:
            {
                "Content-type":"application/json"
            }
        });
        const locations = await locationsResponse.json();
        const zipCodes:UpdateZipCodesPayload = locations?.results.map((location:Location)=>location.zip_code); 
        dispatch(updateZipCodes(zipCodes))
    }catch(e){
        dispatch(fetchingResponseFailed(e));
    }
}

export default getZipCodesMiddleware