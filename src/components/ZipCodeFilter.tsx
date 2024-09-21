import { Autocomplete, Chip, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStoreState } from "../redux/store";
import { updateZipCodes } from "../redux/dogsSlice";
import { useState } from "react";


export default function ZipCodeFilter(){
    const zipCodes:string[] = useSelector((store:RootStoreState)=>store.dogsSlice.filterObj.zipCodes) || [];
    const [currInputValue, setCurrInputValue] = useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const handleStateChange = (event: React.SyntheticEvent<Element>, value: any, reason: string, details?: any)=>{
      const selectedValue: string[] = typeof value === 'string' ? value.split(',') : value;
        dispatch(updateZipCodes(selectedValue));
    };
    const handleBlur = () => {
      if (currInputValue && !zipCodes?.includes(currInputValue)) {
        dispatch(updateZipCodes([...zipCodes,currInputValue]));
      }
      setCurrInputValue("");
    };
    return (
      <Autocomplete
        multiple
        freeSolo
        aria-multiselectable={true}
        value={zipCodes||[]}
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
            label="Filter by zipcode"
            placeholder="Type and press Enter"
            aria-label="Zip code filter"
        />
      )}
    />
    )
    
}