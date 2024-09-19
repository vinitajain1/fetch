import { Autocomplete, Chip, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStoreState } from "../redux/store";
import { updateState, updateZipCodes } from "../redux/dogsSlice";
import { useState } from "react";


export default function StateFilter(){
    const state:string[] = useSelector((store:RootStoreState)=>store.dogsSlice.locationSearchParams.states) || [];
    const [currInputValue, setCurrInputValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const handleStateChange = (event: React.SyntheticEvent<Element>, value: any, reason: string, details?: any)=>{
      const selectedValue: string[] = Array.isArray(value) 
    ? value.map((val) => val.toUpperCase()) 
    : typeof value === 'string' 
        ? value.split(',').map((val) => val.toUpperCase()) 
        : null;
      if(selectedValue.length==0){
        dispatch(updateState(null));
      }else{
        dispatch(updateState(selectedValue));
      }
      dispatch(updateZipCodes([]));
    };
    const handleBlur = () => {
      if (currInputValue && !state?.includes(currInputValue)) {
        dispatch(updateState([...state,currInputValue]));
      }
      setCurrInputValue("");
    };
    return (
      <Autocomplete
        multiple
        freeSolo
        value={state||[]}
        inputValue={currInputValue}
        onInputChange={(_, newInputValue) => setCurrInputValue(newInputValue)}
        onChange={handleStateChange}
        options={[]}
        renderTags={(value: string[], getTagProps) =>
          value.map((option: string, index: number) => (
            <Chip key={index} variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            onBlur={handleBlur} 
            {...params}
            variant="outlined"
            label="Enter two letter State"
            placeholder="Type and press Enter"
        />
      )}
    />
    )
    
}