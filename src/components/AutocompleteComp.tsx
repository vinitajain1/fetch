import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, AutocompleteProps, Box, Button, Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface AutocompleteCompProps extends AutocompleteProps<any,boolean, boolean, boolean>{
    handleOnChange:(selectedValue:string[])=>void
}

export default function AutocompleteComp(props:AutocompleteCompProps){
    const handleChange = (event: React.SyntheticEvent<Element>, value: any, reason: string, details?: any) => {
      const selectedValue = typeof value === 'string' ? value.split(',') : value;
      props.handleOnChange(selectedValue);
      };
    return (
        <Autocomplete
            onChange={handleChange}
            {...props}
            />
    )
    
}