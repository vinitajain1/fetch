import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AutocompleteComp from "./AutocompleteComp";

interface SliderCompProps{
    min:number,
    max:number,
    step:1,
    label:string,
    selectedText:string
}
export default function SliderComp(props:SliderCompProps){
    const [ageRange, setAgeRange] =useState<number[]>([props.min, props.max]);
    const handleAgeChange = (event: Event, newValue: number | number[]) => {
        setAgeRange(newValue as number[]);
    };
    return (
        <div className="border border-customBorder p-4">
            <label htmlFor="age-slider">{props.label}</label>
                <Slider
                    value={ageRange}
                    aria-labelledby="age-slider"
                    onChange={handleAgeChange}
                    valueLabelDisplay="auto"
                    min={props.min}
                    max={props.max}
                    step={props.step}/>
            <p className="text-sm">{props.selectedText}{ageRange[0]} - {ageRange[1]}</p>  
        </div>
    ) 
}