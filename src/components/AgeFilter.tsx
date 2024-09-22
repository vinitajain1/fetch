import { Slider} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreState } from "../redux/store";
import { updateMinMaxAge} from "../redux/dogsSlice";
import { UpdateMinMaxAgePayload } from "../types/action-types";

function ariaValueText(value:number,index:number) {
    return `Age range selected for index ${index} - ${value} years`;
  }

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
            <label htmlFor="dog-age-slider" id="dog-age-slider-label">Dog Age</label>
            <Slider
                role='slider'
                aria-valuemin={0}
                aria-valuemax={15}
                getAriaValueText={ariaValueText}
                aria-labelledby="dog-age-slider-label"
                value={ageRange}
                onChange={handleAgeChange}
                valueLabelDisplay="auto"
                min={0}
                max={15}
                step={1}/>
            <p className="text-sm">Age range selected: {ageRange[0]} - {ageRange[1]} years</p>  
        </div>
    )
    
}