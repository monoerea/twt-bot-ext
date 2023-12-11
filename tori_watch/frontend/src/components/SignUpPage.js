import React, {Component, useState} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUpPage() {
  const [formErrors, setFormErrors] = useState({});
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
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                 error={Boolean(formErrors.username)}
                 helperText={formErrors.username || ''}
                 required
                 fullWidth
                 id="username"
                 label="Username"
                 name="username"
                 autoComplete="username"
                 onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(formErrors.email)}
                  helperText={formErrors.email || ''}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                error={Boolean(formErrors.password)}
                helperText={formErrors.password}
                required
                fullWidth
                name="password"
                label="Password"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/sign_in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}