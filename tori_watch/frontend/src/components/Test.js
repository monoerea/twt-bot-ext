import React from "react";
import { Box } from "@mui/material";
import HighlightCard from "./HighlightCard";
import MainWrapper from "./MainWrapper";
import { SectionWrapper } from "./Section";
import { drawerItems, settings, highlightItems } from "./constants";
import { Header } from "./Header";

const items = [
        {name:'Export Chart', link:'/'},
        {name:'Add Chart', link:'/'}
      ]
export const Test = () => {
  return (
    <MainWrapper navbar={false} appBarName={'Test'} drawer={true} drawerItems={drawerItems}>
        <Header title={'Dashboard'} items={items}/>
        <SectionWrapper highlightItems={highlightItems}>
        </SectionWrapper>
    </MainWrapper>
  );
};
