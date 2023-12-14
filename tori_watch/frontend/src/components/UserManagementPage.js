import React, { useState } from 'react';
import FullFeaturedCrudGrid from './CrudGrid';
import { saveUserChanges, fetchData} from './api'; // Import the API function for saving changes
import { drawerItems } from "./constants";
import MainWrapper from './MainWrapper';

const UserPage = () => {
  const [rows, setRows] = useState([]);
  fetchData('/api/user', setRows);
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
    <MainWrapper drawerItems = {drawerItems} appBarName = {'User Management'}>
        {rows.length > 0 ? (
            <FullFeaturedCrudGrid initialRows={rows} onSaveChanges={handleSaveChanges} />
          ) : (
            <p>Loading...</p>)}
    </MainWrapper>
  );
};

export default UserPage;
