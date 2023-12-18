import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const csrfToken = document.cookie.match(/csrftoken=([^ ;]+)/)[0];
const headers = new Headers({
  // 'X-CSRFTOKEN': csrfToken,
  'Content-Type': 'application/json',
});


export const saveUserChanges = (updatedRows) => {
  const savePromises = updatedRows.map((row) => {
    const { id, isNew, isDeleted, ...otherData } = row;

    if (isDeleted) {
      // Handle user deletion
      const url = `/api/user-crud/${id}/`;

      return fetch(url, {
        method: 'DELETE',
        headers: headers
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
      const fetchData = fetch(absoluteUrl,{
          method: 'GET',
          headers: headers
        }
        ).then((response) => {
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
  export async function logoutUser(token) {
    const csrfToken = getCSRFToken(); // Implement a function to retrieve the CSRF token
  
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken, // Include the CSRF token in the headers
        // 'Authorization': `Token ${token}`,
        credentials: 'include',
      },
    });
  
    if (response.ok) {
      const data = await response.json();
      console.log('User logged out:', data);
      return data;
    } else {
      const errorData = await response.json();
      console.error('Logout failed:', errorData);
      throw new Error('Logout failed');
    }
  }
  
  // Implement a function to retrieve the CSRF token
  function getCSRFToken() {
    const csrfCookie = document.cookie.match(/csrftoken=([\w-]+)/);
    return csrfCookie ? csrfCookie[1] : '';
  }
  

export const useFetchLoggedInUser = (setData) => {
  useEffect(() => {
    fetch('/api/sign-in', {
      method: 'GET',
      headers: headers,
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(`Failed to fetch logged-in user: ${response.statusText}`);
        }
      })
      .then(loggedInUser => {
        console.log('Logged-in user:', loggedInUser);
        setData(loggedInUser)
      })
      .catch(error => {
        console.error('Failed to fetch logged-in user:', error.message);
      });
  }, [setData]);
};

