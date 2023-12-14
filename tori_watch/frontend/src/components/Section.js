import React, {useState} from "react";
import { Box } from "@mui/material";
import HighlightCard from "./HighlightCard";
export const SectionWrapper = ({children}) =>{
    return(
        <Box pt={4} justifyContent={'center'} justifyItems={'center'}>
            <HighlightCard title='User' content = {'Loren ipsum'} buttonText ={'Say Hi'} />
        </Box>
    );
}