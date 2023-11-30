import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

const AddButton = ({ options, onOptionClick }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (option) => {
    onOptionClick(option);
    handleClose();
  };

  return (
    <div>
      <Button
        variant="contained"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        startIcon={<AddIcon />}
      >
        Add Chart
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map((option) => (
          <MenuItem key={option.value} onClick={() => handleOptionClick(option)}>
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default AddButton;
