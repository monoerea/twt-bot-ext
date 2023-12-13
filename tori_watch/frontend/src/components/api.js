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
