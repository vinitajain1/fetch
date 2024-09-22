import { Autocomplete,TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreState } from "../redux/store";
import { updateSelectedBreeds  } from "../redux/dogsSlice";
import useBreeds from "../hooks/useBreeds";

export default function BreedFilter(){
    const selectedBreedValues:string[] = useSelector((store:RootStoreState)=>store.dogsSlice.filterObj.breeds);
    const breeds = useBreeds();
    const dispatch = useDispatch();
    const handleBreedChange = (event: React.SyntheticEvent<Element>, value: any, reason: string, details?: any) => {
      const selectedValue = typeof value === 'string' ? value.split(',') : value;
      dispatch(updateSelectedBreeds(selectedValue));
    };
    return (
      breeds.data && 
        <Autocomplete
            fullWidth
            aria-multiselectable={true}
            options={breeds.data}
            value={selectedBreedValues}
            multiple
            disablePortal
            onChange={handleBreedChange}
            renderInput={(params) => <TextField aria-label="Breed selection" {...params} label="Breed" />}/>           
    )
    
}