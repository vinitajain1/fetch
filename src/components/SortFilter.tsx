import { FormControl,InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStoreState } from "../redux/store";
import { updateSortValue} from "../redux/dogsSlice";

export default function SortFilter(){
    const sort = useSelector((store:RootStoreState)=>store.dogsSlice.filterObj.sort);
    const dispatch = useDispatch<AppDispatch>();
    const handleSortChange = (event: SelectChangeEvent) => {
        dispatch(updateSortValue(event.target.value as string));
    };

    return (
        <FormControl fullWidth>
            <InputLabel id="sort-select-label">Sort by</InputLabel>
            <Select
            labelId="sort-select-label"
            value={sort}
            label="Sort by"
            onChange={handleSortChange}>
                <MenuItem value={"breed:asc"}>Breed (asc)</MenuItem>
                <MenuItem value={"breed:desc"}>Breed (desc)</MenuItem>
                <MenuItem value={"name:asc"}>Name (asc)</MenuItem>
                <MenuItem value={"name:desc"}>Name (desc)</MenuItem>
                <MenuItem value={"age:asc"}>Age (asc)</MenuItem>
                <MenuItem value={"age:desc"}>Age (desc)</MenuItem>
            </Select>
        </FormControl>
    )
    
}