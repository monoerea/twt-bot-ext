import React from "react";
import { Box } from "@mui/material";
import HighlightCard from "./HighlightCard";
import MainWrapper from "./MainWrapper";
import { SectionWrapper } from "./Section";
import { drawerItems } from "./constants";

export const LandingPage = () => {
  const highlightItems = [
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
    { title: 'User', content: 'Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum', buttonText: 'Say Hi' },
  ];

  return (
    <MainWrapper drawer={true} drawerItems={drawerItems} appBarName={'Welcome'}>
        <SectionWrapper highlightItems={highlightItems}>
        </SectionWrapper>
    </MainWrapper>
  );
};
