import React, { useState, useEffect } from 'react';
import FullFeaturedCrudGrid from './CrudGrid';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import AppBarComponent from './AppBar';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  const toggleDrawer = () => {
    setOpen(!open);
  }
  

  useEffect(() => {
    // Fetch user data from your API or backend server
    fetch('/api/user')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Rename 'uid' to 'id'
        const rowsWithIds = data.map((row) => ({ ...row, id: row.uid }));
        setRows(rowsWithIds);
        console.log(rows, rowsWithIds);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const roles = ['Market', 'Finance', 'Development'];
  const randomRole = () => {
    return randomArrayItem(roles);
  };
  const initialRows = [
    {
      id: randomId(),
      name: randomTraderName(),
      age: 25,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 36,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 19,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 28,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
    {
      id: randomId(),
      name: randomTraderName(),
      age: 23,
      joinDate: randomCreatedDate(),
      role: randomRole(),
    },
  ];

  return (
    <ThemeProvider theme={createTheme()}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box>
          <AppBarComponent open={open} toggleDrawer={toggleDrawer} name={'Admin'} />
        </Box>
        <Box mt={4} pt={8} textAlign="center" justifyContent={'center'}>
          <h1>HELLO ADMINs!</h1>
          {rows.length > 0 ? (
            <FullFeaturedCrudGrid initialRows = {rows}/>
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserPage;
