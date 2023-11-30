import React, { useState } from 'react';
import { Input, Button, Menu, MenuItem, IconButton, ListItemText, ListItemIcon, Checkbox, Typography } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';

const Filter = ({ filters, onFilterChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterChange = (filter) => {
    onFilterChange(filter);
    handleClose();
  };

  return (
    <>
      <IconButton onClick={handleClick} size="large">
        <FilterListIcon />
      </IconButton>

      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {filters.map((filter) => (
          <MenuItem key={filter.id} onClick={() => handleFilterChange(filter)}>
            <ListItemIcon>
              <Checkbox checked={filter.enabled} />
            </ListItemIcon>
            <ListItemText primary={filter.label} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Filter;
