// AppBarComponent.js
import React from 'react';
import { styled, AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const AppBarStyled = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 160, // Assuming drawerWidth is 240
  width: `calc(100% - 160px)`,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
}),
}));

const AppBarComponent = ({ open, toggleDrawer, name }) => (
  <AppBarStyled open={open}>
      <Toolbar>
        <IconButton onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          {name}
        </Typography>
      </Toolbar>
    </AppBarStyled>
  );

export default AppBarComponent;
