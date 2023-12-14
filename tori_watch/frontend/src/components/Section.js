import React, {useState} from "react";
import { Box } from "@mui/material";
import HighlightCard from "./HighlightCard";
export const SectionWrapper = ({children, highlightItems}) =>{
    return(
        <Box pt={4} justifyContent={"space-between"} display = {'flex'} p={3} alignItems="center" alignContent={'center'} minWidth={'sm'} flex={1} >
        {highlightItems.map((item, index) => (
            <HighlightCard
            key={index}
            title={item.title}
            content={item.content}
            buttonText={item.buttonText}
            style ={{
                flex: '1 1 300px',
                margin: '10px',
                borderRadius: '10px',
                overflow: 'hidden',}}
            />
        ))}
        {children}
        </Box>
    );
}