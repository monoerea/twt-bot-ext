import React, { useState } from 'react';
import { Avatar, Tooltip, Typography, IconButton, Popover, Box, List, ListItemButton, ListItemText, Link } from '@mui/material';

const OptionalAvatar = ({ avatarSrc, settings }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {avatarSrc && (
        <>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenMenu} sx={{ p: 0 }}>
              <Avatar alt="User Avatar" src={avatarSrc} />
            </IconButton>
          </Tooltip>
          <Popover
            id="avatar-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Box>
              <List>
                {settings.map((setting) => (
                  <ListItemButton
                    key={setting.label}
                    onClick={() => {
                      handleCloseMenu();
                      if (setting.onClick) {
                        setting.onClick();
                      }
                    }}
                    component={setting.link ? Link : 'div'}
                    to={setting.link || undefined}
                  >
                    <ListItemText primary={setting.label} />
                  </ListItemButton>
                ))}
              </List>
            </Box>
          </Popover>
        </>
      )}
    </>
  );
};

export default OptionalAvatar;
