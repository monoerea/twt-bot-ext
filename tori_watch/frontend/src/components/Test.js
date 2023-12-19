import React, { useState, useRef, createRef   } from "react";
import { Box, Card, createTheme } from "@mui/material";
import MainWrapper from "./MainWrapper";
import Filter from "./Filter";
import { SectionWrapper } from "./Section";
import { Header } from "./Header";
import { drawerItems, settings, highlightItems, pages, items, chartData, chartOptions, dropdownOptions } from "./constants";



import { Add, ImportExport } from "@mui/icons-material";


import { useFetchLoggedInUser, logoutUser } from "./api";
import { handleExport, handleAddChart } from "./utils";

import { MappedCharts } from "./MappedCharts";
import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';
import AddButton from "./AddButton";


const controllers = Object.values(Chartjs).filter((chart) => chart.id !== undefined);

Chart.register(...controllers);


const cols = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'age', headerName: 'Age', type: 'number', width: 90 },
  { field: 'email', headerName: 'Email', width: 200 },
];


export const Test = () => {
  const chartsContainerRef = useRef(null);
  const [LoggedUser, setUser] = useState([])
  const [charts, setCharts] = useState([])
  useFetchLoggedInUser(setUser);
  const settings = [
    { label: 'Profile', onClick: () => console.log('Profile clicked') },
    { label: 'Account', onClick: () => console.log('Account clicked') },
    { label: 'Dashboard', onClick: () => console.log('Dashboard clicked'), link: '/dashboard/1' },
    { label: 'Logout', onClick: () => { console.log('Logout clicked'); logoutUser(LoggedUser.token); },
    link: '/' 
    },
  ];
  const headerItems = [
    { icon: <ImportExport />, name: 'Export Chart', link: '/', onClick: handleExport },
    {
      icon: <Add />,
      name: 'Add Chart',
      component: (
        <AddButton
          options={[
            { label: 'Add Bar Chart', value: 'bar' },
            { label: 'Add Line Chart', value: 'line' },
            { label: 'Add Doughnut Chart', value: 'doughnut' },
          ]}
          onOptionClick={(option) => handleAddChart(option.value, dropdownOptions[2], setCharts)}
          size="small"
          style={{ height: '100%', minWidth: '120px' }}
        />
      ),
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

  const chartRefs = useRef(Array.from({ length: charts.length }).map(() => createRef()));
  
  const defaultTheme = createTheme();
  console.log(defaultTheme.palette, defaultTheme.palette.primary.main)

  return (
    <MainWrapper theme={defaultTheme}
    drawerWidth={240}
    avatar={true} settings={settings}
    title = {'Dashboard'}
    items={items}
    drawer={true}
    >
    <Card sx={{  padding: '20px',borderRadius:'20px', background: `linear-gradient(90deg,
                ${defaultTheme.palette.secondary.main},
                ${defaultTheme.palette.primary.main}, 
                ${defaultTheme.palette.common.white})`,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        color: defaultTheme.palette.common.white}}>
    <Box>
      <Header
        title={'Dashboard'}
        items={headerItems}
        text={'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum'}
      >
        <Filter filters={filters} onFilterChange={handleFilterChange} />
      </Header> 
    </Box>
    </Card>
    <SectionWrapper highlightItems={highlightItems}/>
    {/* <Filter filters={filters} onFilterChange={handleFilterChange} /> */}
    <MappedCharts chartData={chartData} chartOptions={chartOptions} dropdownOptions={dropdownOptions} charts={charts} setCharts={setCharts} chartRefs={chartRefs} />
    
</MainWrapper>
  );
};

