import { Slider} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreState } from "../redux/store";
import { updateMinMaxAge} from "../redux/dogsSlice";
import { UpdateMinMaxAgePayload } from "../types/action-types";


export default function AgeFilter(){
    const dispatch = useDispatch();
    const ageRange=[];
    ageRange[0]= useSelector((store:RootStoreState)=>store.dogsSlice.filterObj.ageMin);
    ageRange[1] = useSelector((store:RootStoreState)=>store.dogsSlice.filterObj.ageMax);
    const handleAgeChange = (event: Event, newValue: UpdateMinMaxAgePayload) => {
        dispatch(updateMinMaxAge(newValue));
    };
    return (
        <div className="border border-customBorder p-4">
            <label>Dog Age</label>
            <Slider
                value={ageRange}
                onChange={handleAgeChange}
                valueLabelDisplay="auto"
                min={0}
                max={15}
                step={1}/>
            <p className="text-sm">Selected age in years: {ageRange[0]} - {ageRange[1]}</p>  
        </div>
    )
    
}