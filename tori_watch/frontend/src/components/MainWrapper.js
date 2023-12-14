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

const MainWrapper = ({children, drawerItems, appBarName}) => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth='xl' justifyContent='center' sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box  sx={{ display: 'flex' }}>
          <DrawerComponent open={open} drawerItems={drawerItems}/>
          <AppBarComponent open={open} toggleDrawer={toggleDrawer} name={appBarName} />
        </Box>
        <Box mt={4} pt={4} textAlign="center" justifyContent={'center'}>
          <ErrorBoundary>
             {children}
          </ErrorBoundary>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default MainWrapper;