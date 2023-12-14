import React, { useState, useEffect } from 'react';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const errorHandler = (error, errorInfo) => {
      setHasError(true);
      // Log the error or send an error report
      console.error(error, errorInfo);
    };

    // Set up the error handler
    window.addEventListener('error', errorHandler);

    // Clean up the error handler when the component unmounts
    return () => {
      window.removeEventListener('error', errorHandler);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export default ErrorBoundary;
