import React, { useEffect, useState } from 'react';
import {
  useTheme,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Menu,
  Button,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';

// ... (previous imports remain the same)

const ChartCard = ({ chartType, chartData, chartOptions, dropdownCount, chartRef, onDelete, onModify }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [dropdownOptions, setDropdownOptions] = useState(Array.from({ length: dropdownCount }, () => []));
  const [chartOptionsArray, setChartOptionsArray] = useState(Array(dropdownCount).fill(''));
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleOptionsChange = (event, index) => {
    const updatedChartOptionsArray = [...chartOptionsArray];
    updatedChartOptionsArray[index] = event.target.value;
    setChartOptionsArray(updatedChartOptionsArray);

    if (chartRef.current) {
      chartRef.current.options.title.text = `Chart Title: ${event.target.value}`;
      chartRef.current.update();
    }
  };

  const alt_options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Add more options as needed
  ];

  const fetchOptions = async (index) => {
    try {
      const data = { options: alt_options };

      setDropdownOptions((prevOptions) => {
        const updatedOptions = [...prevOptions];
        updatedOptions[index] = data.options;
        return updatedOptions;
      });
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching options:', error);
      setDropdownOptions((prevOptions) => [
        ...prevOptions,
        Array(dropdownCount).fill(alt_options),
      ]);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    Array.from({ length: dropdownCount }).forEach((_, index) => {
      fetchOptions(index);
    });
  }, [dropdownCount]);

  const renderChart = () => {
    switch (chartType) {
      case 'doughnut':
        return <Doughnut ref={chartRef} data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar ref={chartRef} data={chartData} options={chartOptions} />;
      case 'line':
        return <Line ref={chartRef} data={chartData} options={chartOptions} />;
      case 'radar':
        return <Radar ref={chartRef} data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  const handleMoreVertClick = (event) => {
    setAnchorEl(event.currentTarget);
    //setIsDropdownOpen(true); // Open the dropdown when the menu is clicked
  };

  const handleMoreVertClose = () => {
    setAnchorEl(null);
    setIsDropdownOpen(false); // Close the dropdown when the menu is closed
  };

  const handleModifyClick = () => {
    if (onModify) {
      // Open the dropdown
      setIsDropdownOpen(true);
    }
    setAnchorEl(null);
  };
  
  // useEffect to check the value of isDropdownOpen
  useEffect(() => {
    console.log('Is dropdown open?', isDropdownOpen);
  }, [isDropdownOpen]);
  
  const handleSave = () => {
    // Implement your save logic here
    console.log('Options saved:', chartOptionsArray);
    setIsDropdownOpen(false);
  
    // You can perform additional actions, such as updating the backend or triggering other events
  };
  
  const renderDropdowns = () => {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          {dropdownOptions.map((options, index) => (
            <FormControl key={index} style={{ minWidth: 120, marginRight: 10 }}>
              <InputLabel id={`${chartType}-chart-option-label-${index}`}>
                {`${chartType} Chart Option ${index + 1}`}
              </InputLabel>
              <Select
                labelId={`${chartType}-chart-option-label-${index}`}
                id={`${chartType}-chart-option-${index}`}
                value={chartOptionsArray[index]}
                onChange={(event) => handleOptionsChange(event, index)}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    );
  };

  

  return (
    <Card style={{ borderRadius: '10px', width: '100%', backgroundColor: theme.palette.background.default }}>
      <CardContent>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <IconButton onClick={handleMoreVertClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMoreVertClose}
          >
            <MenuItem onClick={handleModifyClick}>
              Modify
            </MenuItem>
            <MenuItem onClick={onDelete}>
              Delete
            </MenuItem>
          </Menu>
        </div>

        {renderChart()}
        {isDropdownOpen && renderDropdowns()} {/* Render dropdowns only when the dropdown is open */}
      </CardContent>
    </Card>
  );
};

export default ChartCard;
