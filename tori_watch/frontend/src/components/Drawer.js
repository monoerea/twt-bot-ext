// DrawerComponent.js
import React from 'react';
import { styled, Drawer, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

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
      marginTop: theme.spacing(8),
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

const DrawerComponent = ({ open, drawerItems, children }) => {
  const itemsToRender = Array.isArray(drawerItems) ? drawerItems : [];

  return (
    <DrawerStyled variant="permanent" open={open}>
      <Divider />
      <List>
        {itemsToRender.map(({ icon, text, link }, index) => (
          <ListItem button key={index} component={Link} to={link}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      {children}
    </DrawerStyled>
  );
};

export default DrawerComponent;
