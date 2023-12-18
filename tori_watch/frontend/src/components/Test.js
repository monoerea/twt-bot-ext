import React, { useState } from "react";
import { Box, Card, createTheme } from "@mui/material";
import HighlightCard from "./HighlightCard";
import MainWrapper from "./MainWrapper";
import { SectionWrapper } from "./Section";
import { drawerItems, settings, highlightItems, pages, items } from "./constants";
import { Header } from "./Header";
import { Add, ImportExport } from "@mui/icons-material";
import Filter from "./Filter";
import MiniDrawer from "./MiniDrawer";
import { useFetchLoggedInUser, logoutUser } from "./api";

const sectionItems = [
  { icon: <ImportExport />, name: 'Export Chart', link: '/' },
  { icon: <Add />, name: 'Add Chart', link: '/' }
];

const cols = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'email', headerName: 'Email', width: 200 },
];


export const Test = () => {
  const [LoggedUser, setUser] = useState([])

  useFetchLoggedInUser(setUser);
  const settings = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Account', onClick: () => console.log('Account clicked') },
    { label: 'Dashboard', onClick: () => console.log('Dashboard clicked'), link: '/dashboard/1' },
    { label: 'Logout', onClick: () => { console.log('Logout clicked'); logoutUser(LoggedUser.token); },
    link: '/' 
    },
  ];
  const [filters, setFilters] = useState(
    cols.map((column) => ({
      id: column.field,
      label: column.headerName,
      enabled: false,
    }))
  );

  const handleFilterChange = (changedFilter) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === changedFilter.id ? { ...filter, enabled: !filter.enabled } : filter
    );
    setFilters(updatedFilters);
  };
  const defaultTheme = createTheme();
  console.log(defaultTheme.palette, defaultTheme.palette.primary.main)

  return (
    <MainWrapper theme={defaultTheme}
    drawerWidth={240}
    avatar={true} settings={settings}
    title = {'Dashboards'}
    items={items}
    drawer={true}
    >
      <Card sx={{ marginBottom: '20px', padding: '20px',borderRadius:'20px', background: `linear-gradient(90deg,
                  ${defaultTheme.palette.secondary.main},
                  ${defaultTheme.palette.primary.main}, 
                  ${defaultTheme.palette.common.white})`,
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          color: defaultTheme.palette.common.white}}>
      <Box>
        <Header
          title={'Dashboard'}
          items={sectionItems}
          text={'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'}
        >
          <Filter filters={filters} onFilterChange={handleFilterChange} />
        </Header> 
      </Box>
      </Card>
      <SectionWrapper highlightItems={highlightItems}/>
      <Filter filters={filters} onFilterChange={handleFilterChange} /> 
    </MainWrapper>
  );
};

