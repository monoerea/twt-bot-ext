import React, { Component } from "react";
import { Button, TextField, Grid, Typography, ForHelperText, FormControl, FormControlLabel, FormHelperText, CssBaseline, Avatar, Checkbox, Paper, Box , createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Link } from "react-router-dom";




function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Tori Watch
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


// TODO remove, this demo shouldn't need to reset the theme.

  
export default class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.defaultTheme = createTheme();
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('hello',{
      username: data.get('username'),
      password: data.get('password'),
    });
    const requestOptions = {
      method: 'POST',
      headers:{'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: data.get('username'),
        password: data.get('password'),
      })
    };

    fetch('/api/sign-in', requestOptions)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // Handle the JSON response data
        console.log('working',data);
      })
      .catch((err) => {
        // Handle errors
        console.error(err);
      });

  }

  render() {
    console.log('SignIn');
    return(  
      <ThemeProvider theme={this.defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={this.handleSubmit} sx={{mt:1}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, alignSelf: 'center' }}  // Align to center
              onSubmit={this.handleSubmit}
              >
              Sign In
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 3, mb: 2, alignSelf: 'center' }}  // Align to center
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
                  <Link href="/sign_up" variant="body2" to="/sign_up" component={Link}>
                    {"Don't have an account? Sign Up Now"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    );
  }
}