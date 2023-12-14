import React, { useState, useEffect, useRef, createRef  } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Button, Icon, Box} from '@mui/material';

import AppBarComponent from './AppBar';
import DrawerComponent from './Drawer';
import ErrorBoundary from './ErrorBoundary';

import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';

const controllers = Object.values(Chartjs).filter((chart) => chart.id !== undefined);

Chart.register(...controllers);

const defaultTheme = createTheme();

const MainWrapper = ({children, drawer, drawerItems, appBarName}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth='xl' justifyContent='center' sx={{ display: 'flex', justifyContent:'center', minWidth:'false' }}>
        <CssBaseline />
        {/* <Box  sx={{ display: 'flex' }}>
          {drawer && <DrawerComponent open={open} drawerItems={drawerItems} />}
          <AppBarComponent open={open} toggleDrawer={toggleDrawer} name={appBarName} />
        </Box> */}
        <div style={{ flex: '0 0 auto' }}>
          {drawer && <DrawerComponent open={open} drawerItems={drawerItems} />}
          <AppBarComponent open={open} toggleDrawer={toggleDrawer} name={appBarName} />
        </div>
        <Box
          flex="1"
          display="flex"
          flexDirection="column"
          marginTop="60px"
          padding="20px"
          justifyContent="space-between"
          position="sticky"
          top="0"
          overflowY="auto"
        >
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default MainWrapper;