import React, { useState, useEffect } from 'react';
import FullFeaturedCrudGrid from './CrudGrid';
import { ThemeProvider, createTheme, CssBaseline, Container, Box } from '@mui/material';
import AppBarComponent from './AppBar';
import { randomArrayItem } from '@mui/x-data-grid-generator';
import { saveUserChanges } from './api'; // Import the API function for saving changes

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
        // Rename 'uid' to 'id'
        const rowsWithIds = data.map((row) => ({ ...row, id: row.uid }));
        setRows(rowsWithIds);
        // console.log(rows, rowsWithIds);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const roles = ['Market', 'Finance', 'Development'];
  const randomRole = () => {
    return randomArrayItem(roles);
  };

  const handleSaveChanges = (updatedRows) => {
    // Call the API function to save changes
    console.log('UserPage',updatedRows)
    saveUserChanges(updatedRows)
      .then((response) => {
        // Handle the response, e.g., show a success message
        console.log('Changes saved successfully:', response);
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error('Error saving changes:', error);
      });
  };

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
            <FullFeaturedCrudGrid initialRows={rows} onSaveChanges={handleSaveChanges} />
          ) : (
            <p>Loading...</p>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default UserPage;
