import { useState, useEffect } from "react";

export const saveUserChanges = (updatedRows) => {
  const savePromises = updatedRows.map((row) => {
    const { id, isNew, isDeleted, ...otherData } = row;

    if (isDeleted) {
      // Handle user deletion
      const url = `/api/user-crud/${id}/`;

      return fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
        })
        .catch((error) => {
          console.error(`Error deleting user with ID ${id}:`, error.message);
          throw new Error(`Error deleting user with ID ${id}: ${error.message}`);
        });
    } else {
      // Handle user creation or update
      const url = isNew ? '/api/create-user' : `/api/user-crud/${id}/`;
      const method = isNew ? 'POST' : 'PUT';

      // Remove the 'id' field for new user creation
      const requestBody = isNew
        ? JSON.stringify({ ...otherData })
        : JSON.stringify(otherData);

      return fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: requestBody,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .catch((error) => {
          console.error(
            `Error ${isNew ? 'creating' : 'updating'} user:`,
            error.message
          );
          throw new Error(
            `Error ${isNew ? 'creating' : 'updating'} user: ${error.message}`
          );
        });
    }
  });

  return Promise.all(savePromises)
    .then((results) => {
      console.log('Changes saved successfully:', results);
      return results;
    })
    .catch((error) => {
      console.error('Error saving changes:', error.message);
      throw new Error(`Error saving changes: ${error.message}`);
    });
};
export const fetchData = (apiEndpoint, setRows) =>{
  const [data, setData] = useState([]);
  useEffect(() => {
    const absoluteUrl = new URL(apiEndpoint, window.location.origin);
    // Fetch user data from your API or backend server
    const fetchData = fetch(absoluteUrl).then((response) => {
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
    setData(fetchData);
  }, [apiEndpoint, setRows]); 
}
