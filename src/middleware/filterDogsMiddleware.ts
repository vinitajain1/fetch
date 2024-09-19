import { FetchingDogsSuccessPayload } from "../types/action-types";
import { fetchingResponseFailed,fetchingDogsStarted,fetchingDogsSuccess } from "../redux/dogsSlice";
import { AppDispatch, RootStoreState } from "../redux/store";
import { AppState, Cursor, DogIdsResponse } from "../types/types";
import { objectToQueryParams } from "../utils/utilities";
import getLocationMiddleware from "./getLocationMiddleware";
import getZipCodesMiddleware from "./getZipCodesMiddleware";

const filterDogsMiddleware = (cursor:Cursor=0)=>async(dispatch:AppDispatch,getState: () => RootStoreState)=>{
    dispatch(fetchingDogsStarted());
    try{
        const appState:AppState = getState().dogsSlice;
        if(appState.locationSearchParams.city || (appState.locationSearchParams?.states && appState.locationSearchParams?.states.length>0)){
            await dispatch(getZipCodesMiddleware());
        }
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
    }catch(e){
        dispatch(fetchingResponseFailed(e));
    }

}

export default filterDogsMiddleware;