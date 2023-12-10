import React, { useState, useEffect} from "react";
import {
  Button,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
  Paper,
  Box,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Avatar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  console.log("Error state:", error);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: formData.username,
        password: formData.password,
      }),
    };
  
    fetch("/api/sign-in", requestOptions)
      .then((response) => {
        if (!response.ok) {
          // If the HTTP request is not successful (e.g., 401 Unauthorized),
          // handle the error based on the status code or response content
          return response.json().then((errorText) => {
            console.log('errorText',errorText)
            console.log('errorText',errorText.detail)
            const errorDetail = errorText.detail || "An error occurred.";
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorDetail}`);
          });
        }
  
        return response.json();
      })
      .then((data) => {
        // Assuming your server returns a user ID upon successful login
        const userId = data.uid;
        if (userId != null) {
          // Redirect to the dashboard
          navigate(`/dashboard/${userId}`);
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
  
        // Set the error state to the response body or a generic message
        setError(error.message ?? "An error occurred. Please try again.");
      });
  };
  
  

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(""); // Clear the error message when input changes
  };

  return (
    <ThemeProvider theme={createTheme()}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                error={Boolean(error)} // Convert error string to boolean
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
                helperText={error && error} // Display error message if it exists
              />
              <TextField
                margin="normal"
                error={Boolean(error)} // Convert error string to boolean
                required
                fullWidth
                id="password"
                label="Password"
                name="password"
                autoFocus
                value={formData.password}
                onChange={handleChange}
                helperText={error && error} // Display error message if it exists
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, alignSelf: "center" }}
              >
                Sign In
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, alignSelf: "center" }}
                to="/"
                component={Link}
              >
                Back
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgot_password" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="/sign_up"
                    variant="body2"
                    to="/sign_up"
                    component={Link}
                  >
                    {"Don't have an account? Sign Up Now"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignInPage;
