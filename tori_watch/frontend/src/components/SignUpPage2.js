import React, {Component, useState} from "react";
import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Grid,
    Box,
    Typography,
    Container
  } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PasswordField from "./PasswordField";
import SignUpFormFields from "./SignUpForm";
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const formFields = [
    {
      id: 'username',
      label: 'Username',
      type: 'text',
      autoComplete: 'username',
    },
    {
      id: 'email',
      label: 'Email Address',
      type: 'email',
      autoComplete: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      autoComplete: 'new-password',
    },
  ];
// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUpPage() {
  const [formErrors, setFormErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get('username'),
      password: data.get('password'),
      email: data.get('email')
    });
    
    const requestOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: data.get('username'),
        email: data.get('email'),
        password: data.get('password'),
      })
    };

    fetch('/api/create-user', requestOptions)
  .then((res) => {
    if (!res.ok) {
      // Check if the response has a JSON body
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        // Parse the JSON body in case of an error
        return res.json().then((errorData) => {
          console.log('Error:', errorData);

          // Set the formErrors state with errors for each field
          setFormErrors({
            username: errorData.username || '',
            email: errorData.email || '',
            password: errorData.password || '',
          });

          throw new Error(`HTTP error! Status: ${res.status}, Message: ${errorData.detail || 'Unknown error'}`);
        });
      } else {
        // If there's no JSON body, create a generic error message
        throw new Error(`HTTP error! Status: ${res.status}, Message: Unknown error`);
      }
    }
    // Reset errors if the request is successful
    setFormErrors({});

    // Parse the JSON body of a successful response
    return res.json();
  })
  .then((data) => {
    // Handle the JSON response data
    console.log('Success:', data);
  })
  .catch((err) => {
    // Handle errors
    console.error('Error during fetch:', err);
  });


  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear the specific error when the input changes
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <SignUpFormFields
            formFields={formFields}
            formErrors={formErrors}
            handleChange={handleChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleSubmit={handleSubmit}
          />
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}