import React, {useState} from "react";
import { Box } from "@mui/material";
import HighlightCard from "./HighlightCard";
export const SectionWrapper = ({ children, highlightItems }) => {
    return (
      <Box justifyContent="space-evenly" display="flex" alignItems="center" alignContent="center" minWidth="sm" flex={1} flexDirection={{ xs: 'column', md: 'row' }}>
        {highlightItems && Array.isArray(highlightItems) && highlightItems.map((item, index) => (
          <HighlightCard
            key={index}
            title={item.title}
            content={item.content}
            buttonText={item.buttonText}
            endIcon={item.endIcon}
          />
        ))}
        {children}
      </Box>
    );
  };