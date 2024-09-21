import { Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../redux/store";
import filterDogsMiddleware from "../middleware/filterDogsMiddleware";
import BreedFilter from "./BreedFilter";
import AgeFilter from "./AgeFilter";
import SortFilter from "./SortFilter";
import ZipCodeFilter from "./ZipCodeFilter";

export default function Filter(){
    const dispatch = useDispatch<AppDispatch>();
    const [expanded, setExpanded] = useState(false);
    const handleAccordionChange = (event: React.SyntheticEvent, expanded: boolean)=>{
      setExpanded(expanded);
    }
    const handleOnClick = ()=>{
      setExpanded(false);
      dispatch(filterDogsMiddleware());
    }
    return (
        <div className="pl-10 pr-20 py-7 flex justify-center gap-7 w-full bg-customBackground">
            <Accordion expanded={expanded} onChange={handleAccordionChange} aria-label="Dog Filters">
                <AccordionSummary role="button" aria-controls="filter-content" id='filter-header'>
                    <p className="text-customPurple font-bold">I am looking for a dog that...</p>
                </AccordionSummary>
                <AccordionDetails id='filter-content'>
                    <div className="flex flex-col gap-4 p-2">
                        <BreedFilter/>
                        <AgeFilter/>
                        <ZipCodeFilter/>
                        <SortFilter/>
                        <Button role="button" aria-label="apply filters" variant="outlined" onClick={handleOnClick}>Filter</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
    
}