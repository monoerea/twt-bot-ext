import React, { useState, useEffect, useRef, createRef  } from 'react';
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Button, Icon, Box} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AppBarComponent from './AppBars';
import DrawerComponent from './Drawers';
import ErrorBoundary from './ErrorBoundary';

import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';
import NavBar from './NavBar';
import MiniDrawer from './MiniDrawer';

const controllers = Object.values(Chartjs).filter((chart) => chart.id !== undefined);

Chart.register(...controllers);



const MainWrapper = ({ children, drawer, drawerWidth, navbar, pages, settings, login, avatar, items, title, logoImg }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box  component='main' id='main2' height = '100vh' display="flex" flexDirection="column" style={{overflowY:'auto'}}>
        <CssBaseline />

        {navbar && <NavBar pageList={pages} settings={settings} logoImg={logoImg} login={login} avatar={avatar} />}
        {title && (
          <AppBarComponent
            open={open}
            drawerWidth={drawerWidth}
            title={title}
            avatar={avatar}
            settings={settings}
            handleDrawerOpen={handleDrawerOpen}
          />
        )}
        <Box display="flex" 
        // flex="1 0 auto"
        >
          {drawer && (
            <DrawerComponent theme={theme} open={open} drawerWidth={drawerWidth} items={items} handleDrawerClose={handleDrawerClose} />
          )}
          <Box
            component="main"
            mt={items ? 7 : 0}
            flex="1"
            display="flex"
            flexDirection="column"
            p={4}
            justifyContent="space-between"
            // position="sticky"
            top="0"
            overflowY="auto"
          >
          <style>
          {`
          ::-webkit-scrollbar {
            width: 8px;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-thumb {
            background-color: #7f8c8d;
            border-radius: 4px;
          }

          ::-webkit-scrollbar-track {
            background-color: #f1f1f1;
            border-radius: 4px;
          }
        `}
        </style>
            <ErrorBoundary>{children}</ErrorBoundary>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default MainWrapper;