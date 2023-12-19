import React from "react";
import { Box } from "@mui/material";
import HighlightCard from "./HighlightCard";

export const SectionWrapper = ({ children, highlightItems }) => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', md: 'row' }} // Stack on small screens, row on medium screens and above
      justifyContent="space-evenly"
      alignItems="center"
      alignContent="center"
      flexWrap="wrap" // Allow items to wrap to the next row
      minWidth="sm"
      flex={1}
    >
      {highlightItems &&
        Array.isArray(highlightItems) &&
        highlightItems.map((item, index) => (
          <HighlightCard
            key={index}
            title={item.title}
            content={item.content}
            buttonText={item.buttonText}
            endIcon={item.endIcon}
            style={{
              flex: '1 1 300px',
              margin: '10px',
              borderRadius: '10px',
              overflow: 'hidden',
              minWidth: '300px', // Set a minimum width for each card
              maxWidth: '400px', // Set a maximum width for each card
            }}
          />
        ))}
      {children}
    </Box>
  );
};
