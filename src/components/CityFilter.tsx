import { TextField} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStoreState } from "../redux/store";
import { updateCity, updateZipCodes } from "../redux/dogsSlice";
export default function CityFilter(){
    const city = useSelector((store:RootStoreState)=>store.dogsSlice.locationSearchParams.city);
    const dispatch = useDispatch<AppDispatch>();
    const handleCityChange = (event)=>{
        dispatch(updateCity(event.target.value));
        dispatch(updateZipCodes([]));
    }
    return (
        <TextField
            label="Filter by city..."
            variant="outlined"
            value={city || ""}
            onChange={handleCityChange}
            fullWidth/>
    )
    
}