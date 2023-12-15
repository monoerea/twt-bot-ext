import React, { useState, useEffect, useRef, createRef  } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Button, Icon, Box} from '@mui/material';

import AppBarComponent from './AppBar';
import DrawerComponent from './Drawer';
import ErrorBoundary from './ErrorBoundary';

import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';
import NavBar from './NavBar';

const controllers = Object.values(Chartjs).filter((chart) => chart.id !== undefined);

Chart.register(...controllers);

const defaultTheme = createTheme();

const MainWrapper = ({children, drawer, drawerItems, appBarName, navbar, pages, settings, logoImg, login, avatar}) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  console.log('MainWrapper', pages)

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box>
        <CssBaseline />
        {navbar && <NavBar pageList={pages} settings={settings} logoImg={logoImg} login={login} avatar={avatar}/>}
        {appBarName && <AppBarComponent open={open} toggleDrawer={toggleDrawer} name={appBarName} />}
          <Box display={'flex'} flex={'0 0 auto'}>
              {drawer && <DrawerComponent open={open} drawerItems={drawerItems} />}
              <Box
              flex="1"
              display="flex"
              flexDirection="column"
              // marginTop="60px"
              // padding="20px"
              justifyContent="space-between"
              position="sticky"
              top="0"
              overflowY="auto"
            >
              <ErrorBoundary>
                {children}
              </ErrorBoundary>
            </Box>
          </Box>
      </Box>
       
    </ThemeProvider>
  );
};
export default MainWrapper;