import { FetchingDogsSuccessPayload } from "../types/action-types";
import { fetchingResponseFailed,fetchingDogsStarted,fetchingDogsSuccess } from "../redux/dogsSlice";
import { AppDispatch, RootStoreState } from "../redux/store";
import { Cursor, DogIdsResponse, Severity } from "../types/types";
import { objectToQueryParams } from "../utils/utilities";
import getLocationMiddleware from "./getLocationMiddleware";
import { updateSnackBar } from "../redux/notificationSnackbarSlice";

const filterDogsMiddleware = (cursor:Cursor=0)=>async(dispatch:AppDispatch,getState: () => RootStoreState)=>{
    dispatch(fetchingDogsStarted());
    try{
        const queryParams = objectToQueryParams({...getState().dogsSlice.filterObj,from:cursor});
        let searchURL = `https://frontend-take-home-service.fetch.com/dogs/search`
        if(queryParams){
            searchURL = searchURL + `?${queryParams}`;
        }
        const dogIdsRes = await fetch(searchURL,{credentials:"include"});
        const dogsIds:DogIdsResponse = await dogIdsRes.json();
        const dogsRes = await fetch("https://frontend-take-home-service.fetch.com/dogs",{headers:{
            "Content-type":"application/json"
        },credentials:"include",method:"POST",body:JSON.stringify(dogsIds.resultIds)});
        const dogsList = await dogsRes.json();
        const payload:FetchingDogsSuccessPayload = {
            dogs:dogsList,
            next:dogsIds.next,
            total:dogsIds.total,
        }
        dispatch(fetchingDogsSuccess(payload));
        dispatch(getLocationMiddleware());
    }catch(error){
        dispatch(fetchingResponseFailed("error fetching dogs"));
        dispatch(updateSnackBar({open:true,message:"Error fetching dogs. Logout and Login again!",severity:Severity.ERROR}));
    }

}

export default filterDogsMiddleware;