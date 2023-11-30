// Import necessary dependencies
import React, { useEffect, useState, useRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, CardActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';

// Define OPTIONS_URL (replace with actual endpoint)
const OPTIONS_URL = 'your_server_endpoint';

const ChartCard = ({ chartType, chartData, chartOptions, dropdownCount, dropOptions }) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState(Array.from({ length: dropdownCount }, () => []));
  const [chartOptionsArray, setChartOptionsArray] = useState(Array(dropdownCount).fill(''));

  // Ref to hold chart component references
  const chartRefs = useRef(Array(dropdownCount).fill(null));

  const handleOptionsChange = (event, index) => {
    const updatedChartOptionsArray = [...chartOptionsArray];
    updatedChartOptionsArray[index] = event.target.value;
    setChartOptionsArray(updatedChartOptionsArray);
  };

  const alt_options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    // Add more options as needed
  ];

  const fetchOptions = async (index) => {
    try {
      // Simulate a fetch from the server
      // const response = await fetch(OPTIONS_URL);
      // const data = await response.json();

      // Simulated response
      const data = { options: alt_options };

      // Update the options state
      setChartOptionsArray(Array(dropdownCount).fill(''));
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
    // Fetch options for each dropdown when the component mounts
    Array.from({ length: dropdownCount }).forEach((_, index) => {
      fetchOptions(index);
    });
  }, []); // Run this effect only once when the component mounts

  const renderChart = (index) => {
    switch (chartType) {
      case 'doughnut':
        return <Doughnut ref={(ref) => (chartRefs.current[index] = ref)} data={chartData} options={chartOptions} />;
      case 'bar':
        return <Bar ref={(ref) => (chartRefs.current[index] = ref)} data={chartData} options={chartOptions} />;
      case 'line':
        return <Line ref={(ref) => (chartRefs.current[index] = ref)} data={chartData} options={chartOptions} />;
      case 'radar':
        return <Radar ref={(ref) => (chartRefs.current[index] = ref)} data={chartData} options={chartOptions} />;
      default:
        return null;
    }
  };

  return (
    <Card style={{ borderRadius: '10px', width: '100%', backgroundColor: theme.palette.background.default }}>
      <CardContent>
        {!isLoading && Array.from({ length: dropdownCount }).map((_, index) => renderChart(index))}
      </CardContent>
      <CardActions style={{ display: 'flex', justifyContent: 'center', overflow: 'auto' }}>
        {!isLoading &&
          Array.from({ length: dropdownCount }).map((_, index) => (
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
                {dropdownOptions[index].map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ))}
      </CardActions>
    </Card>
  );
};

export default ChartCard;
