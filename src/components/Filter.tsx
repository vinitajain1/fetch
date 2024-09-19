import { Accordion, AccordionDetails, AccordionSummary, Button} from "@mui/material";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { AppDispatch } from "../redux/store";
import filterDogsMiddleware from "../middleware/filterDogsMiddleware";
import BreedFilter from "./BreedFilter";
import AgeFilter from "./AgeFilter";
import CityFilter from "./CityFilter";
import StateFilter from "./StateFilter";
import SortFilter from "./SortFilter";

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
            <Accordion expanded={expanded} onChange={handleAccordionChange}>
                <AccordionSummary>
                    <p className="text-customPurple font-bold">I am looking for a dog that...</p>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="flex flex-col gap-4 p-2">
                        <BreedFilter/>
                        <AgeFilter/>
                        <CityFilter/>
                        <StateFilter/>
                        <SortFilter/>
                        <Button role="button" variant="outlined" onClick={handleOnClick}>Filter</Button>
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
    
}