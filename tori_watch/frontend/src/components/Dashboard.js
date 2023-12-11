import React, { useState, useEffect, useRef, createRef  } from 'react';
import { useParams } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Container, Typography, Button, Icon } from '@mui/material';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';


import AppBarComponent from './AppBar';
import DrawerComponent from './Drawer';
import ChartCard from './ChartCard';
import Filter from './Filter';
import DashboardCard from './HighlightCard';
import AddButton from './AddButton';
import PercentageCardComponent from './PercentageCard';

import { Chart } from 'chart.js';
import * as Chartjs from 'chart.js';

const controllers = Object.values(Chartjs).filter((chart) => chart.id !== undefined);

Chart.register(...controllers);

const drawerWidth = 240;
const defaultTheme = createTheme();

const Dashboard = () => {
  const chartsContainerRef = useRef(null);
  const { uid } = useParams();
  const [open, setOpen] = useState(true);
  const [filterValue, setFilterValue] = useState('');
  const [charts, setCharts] = useState([]); // Array to store chart data
  const [userDetails, setUserDetails] = useState({
    username: '',
  });


  const toggleDrawer = () => {
    setOpen(!open);
  };

  const getUserDetails = async () => {
    try {
      const response = await fetch(`/api/user/${uid}`);
      const data = await response.json();

      setUserDetails({
        username: data.username,
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [uid]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'age', headerName: 'Age', type: 'number', width: 90 },
    { field: 'email', headerName: 'Email', width: 200 },
  ];

  const [filters, setFilters] = useState(
    columns.map((column) => ({
      id: column.field,
      label: column.headerName,
      enabled: false,
    }))
  );

  const handleFilterChange = (changedFilter) => {
    const updatedFilters = filters.map((filter) =>
      filter.id === changedFilter.id ? { ...filter, enabled: !filter.enabled } : filter
    );
    setFilters(updatedFilters);
    // Perform additional logic based on the changed filters, e.g., updating the data grid
    // This is where you can use the filters to filter your data
  };

  const handleDelete = (index) => {
    // Implement the logic to delete the chart at the specified index
    // For example, if you're using an array to store charts, you can splice the array
    const updatedCharts = [...charts]; // Assuming you have a state variable 'charts' that holds all the charts
    updatedCharts.splice(index, 1); // Remove the chart at the specified index
    console.log('Deleted chart');
    setCharts(updatedCharts); // Update the state with the new array
  };
  
  const handleModify = (index) => {
    // Logic to modify the chart at the specified index
    // You can implement a modal or other UI for modification
    console.log(`Modify chart at index ${index}`);
  };
  
  const handleAddChart = (chartType, dropdownOptions2) => {
    // Logic to generate new chart data based on chartType and dropdownOptions
    const newChartData = generateChartData(chartType, dropdownOptions2);
    console.log('Generated Chart Data:', newChartData);
    setCharts((prevCharts) => [...prevCharts, newChartData]);
  };
  
  const generateChartData = (chartType, dropdownOptions2) => {
    // Example: Generate chart data based on the selected chart type
    // You can customize this based on your actual charting library and data structure
    const labels = ['Label 1', 'Label 2', 'Label 3'];
    const data = Array.from({ length: labels.length }, () => Math.floor(Math.random() * 100));
    return {
      labels,
      chartType,
      dropdownOptions2,
      datasets: [
        {
          label: `New ${chartType} Chart`,
          data,
          backgroundColor: 'rgba(255,99,132,0.2)',
          borderColor: 'rgba(255,99,132,1)',
          borderWidth: 1,
          hoverBackgroundColor: 'rgba(255,99,132,0.4)',
          hoverBorderColor: 'rgba(255,99,132,1)',
        },
      ],
    };
  };
  
  const chartRefs = useRef(Array.from({ length: charts.length }).map(() => createRef()));

  // const handleExport = () => {
  //   const chartsContainer = chartsContainerRef.current;
  //   if (chartsContainer) {
  //     const chartCards = chartsContainer.querySelectorAll('.chart-card');
  
  //     const promises = Array.from(chartCards).map((chartCard) => {
  //       return new Promise((resolve) => {
  //         html2canvas(chartCard).then((canvas) => {
  //           const imgData = canvas.toDataURL('image/png');
  //           resolve(imgData);
  //         });
  //       });
  //     });
  
  //     Promise.all(promises).then((imgDataArray) => {
  //       const mergedPdf = new jsPDF();
  
  //       imgDataArray.forEach((imgData, index) => {
  //         if (index > 0) {
  //           mergedPdf.addPage();
  //         }
  //         mergedPdf.addImage(imgData, 'JPEG', 0, 0);
  //       });
  
  //       mergedPdf.save('charts_export.pdf');
  //     });
  //   }
  // };
  const handleExport = () => {
    const chartsContainer = chartsContainerRef.current;
    if (chartsContainer) {
      const chartCards = chartsContainer.querySelectorAll('.chart-card');

      const promises = Array.from(chartCards).map((chartCard) => {
        return new Promise((resolve) => {
          html2canvas(chartCard).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            resolve(imgData);
          });
        });
      });

      Promise.all(promises).then((imgDataArray) => {
        const mergedPdf = new jsPDF();

        imgDataArray.forEach((imgData, index) => {
          if (index > 0) {
            mergedPdf.addPage();
          }
          mergedPdf.addImage(imgData, 'JPEG', 0, 0);
        });

        mergedPdf.save('charts_export.pdf');
      });
    }
  };
  // const handleExport = () => {
  //   const pdf = new jsPDF();
  
  //   chartRefs.current.forEach((chartRef, index) => {
  //     const base64Image = chartRef.current.chart.toBase64Image();
  
  //     if (index > 0) {
  //       pdf.addPage();
  //     }
  
  //     pdf.addImage(base64Image, 'JPEG', 0, 0);
  //   });
  
  //   pdf.save('charts_export.pdf');
  // };
  
  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Monthly Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const dropdownOptions = [
    [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
    ],
    [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  ];

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      {/* Container for the entire dashboard with max height and scrolling */}
      <div
        ref={chartsContainerRef}
        style={{
          display: 'flex',
          flexDirection: 'row',
          overflowY: 'auto',
          maxWidth: '1500px',
          height: '100vh',
        }}
      >
        {/* Drawer */}
        <div style={{ flex: '0 0 auto' }}>
          <DrawerComponent open={open} drawerWidth={drawerWidth} />
          <AppBarComponent open={open} toggleDrawer={toggleDrawer} />
        </div>

        {/* Main content */}
        <div
          style={{
            flex: '1',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '60px',
            padding: '20px',
            justifyContent: 'space-between',
            position: 'sticky',
            top: '0',
            overflowY: 'auto',
          }}
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              alignItems: 'center',
              alignContent: 'center',
            }}
          >
            <Typography variant="h5" style={{ flex: 1, padding: '50px' }}>
              Welcome to Dashboardsss {userDetails.username}!
            </Typography>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                overflowY: 'auto',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', padding: '20px'}}>
                <Typography variant="body1">Lorem Ipsum </Typography>
              </div>
              <div style={{ display: 'flex', padding: '20px'}}>
                    <label htmlFor="file-input">
                      <Button variant="contained" component="span" onClick={handleExport}>
                        Export Charts
                      </Button>
                    </label>
              </div>
              <div style={{ display: 'flex', height: '40px', alignItems: 'center' }}>
                <AddButton
                  options={[
                    { label: 'Add Bar Chart', value: 'bar' },
                    { label: 'Add Line Chart', value: 'line' },
                    { label: 'Add Doughnut Chart', value: 'doughnut' },
                  ]}
                  onOptionClick={(option) => handleAddChart(option.value, dropdownOptions[2])}
                  size="small"
                  style={{ height: '100%', minWidth: '120px' }}
                />
              </div>



              <div style={{ display: 'flex' }}>
                <Filter filters={filters} onFilterChange={handleFilterChange} />
              </div>
            </div>
          </div>

          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
                alignContent: 'center',

              }}
            >
              <div
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignContent: 'center',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    flex: '1 1 300px',
                    margin: '10px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <PercentageCardComponent value={75} label="Completion Rate" title="Monthly Sales" body = "The monthly sales of the company"/>
                </div>
                
                <div
                  style={{
                    flex: '1 1 300px',
                    margin: '10px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <DashboardCard
                    title="Card Title"
                    content="This is the content of the card. You can customize it based on your needs."
                    buttonText="Click Me"
                    onClick={() => console.log('Button Clicked')}
                  />
                </div>
                <div
                  style={{
                    flex: '1 1 300px',
                    margin: '10px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <DashboardCard
                    title="Card Title"
                    content="This is the content of the card. You can customize it based on your needs."
                    buttonText="Click Me"
                    onClick={() => console.log('Button Clicked')}
                  />
                </div>
              </div>
            </div>
            <Filter filters={filters} onFilterChange={handleFilterChange} />
            {/* Container for charts (moved below the main content) */}

           <div
              id="charts-container" 
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
                overflowY: 'auto',
              }}
            >
              {/* Dynamic Chart Cards */}
              {charts.map((chartData, index) => (
                <div
                  key={index}
                  style={{
                    flex: '1 1 300px',
                    margin: '10px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                  }}
                >
                  <ChartCard
                    classname="chart-card"
                    chartType={chartData.chartType}
                    chartData={chartData}
                    chartOptions={chartOptions}
                    dropdownCount={3}
                    dropdownOptions={dropdownOptions[2]}
                    chartRef={chartRefs.current[index + 3]}
                    onDelete={() => handleDelete(index)}
                    onModify={() => handleModify(index)}
                    />
                </div>
              ))}
              
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};
export default Dashboard;