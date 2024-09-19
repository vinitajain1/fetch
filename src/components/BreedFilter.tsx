import { Autocomplete,TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootStoreState } from "../redux/store";
import { updateSelectedBreeds  } from "../redux/dogsSlice";
import { MAIN_URL } from "../utils/utilities";

export default function BreedFilter(){
    const [breeds, setBreeds] = useState<string[]>([]);
    const selectedBreedValues:string[] = useSelector((store:RootStoreState)=>store.dogsSlice.filterObj.breeds);
    const dispatch = useDispatch();
    useEffect(()=>{
        async function fetchBreeds() {
            const res = await fetch(`${MAIN_URL}/dogs/breeds`,{credentials:"include"});
            const breedsRes:string[] = await res.json();
            setBreeds(breedsRes);
        }
        fetchBreeds();
    },[])

      const handleBreedChange = (event: React.SyntheticEvent<Element>, value: any, reason: string, details?: any) => {
        const selectedValue = typeof value === 'string' ? value.split(',') : value;
        dispatch(updateSelectedBreeds(selectedValue));
      };
    return (
        <Autocomplete 
            options={breeds}
            value={selectedBreedValues}
            multiple
            disablePortal
            sx={{ width: 600 }}
            onChange={handleBreedChange}
            renderInput={(params) => <TextField {...params} label="Breed" />}/>           
    )
    
}