// DrawerComponent.js
import React from 'react';
import { styled, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Home as HomeIcon, BarChart as BarChartIcon, Settings as SettingsIcon } from '@mui/icons-material';

const DrawerStyled = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open, drawerWidth }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        marginTop: theme.spacing(8), // Adjust the top margin to match the AppBar height
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    })
  );
  
const DrawerComponent = ({ open }) => {
  const drawerItems = [
    { icon: <HomeIcon />, text: 'Home' },
    { icon: <BarChartIcon />, text: 'Charts' },
    { icon: <SettingsIcon />, text: 'Settings' },
  ];

  return (
    <DrawerStyled variant="permanent" open={open}>
      <Divider />
      <List>
        {drawerItems.map(({ icon, text }, index) => (
          <ListItem key={index}>
            <ListItemIcon>{icon}</ListItemIcon>
            {open && <ListItemText primary={text} />}
          </ListItem>
        ))}
      </List>
    </DrawerStyled>
  );
};

export default DrawerComponent;
