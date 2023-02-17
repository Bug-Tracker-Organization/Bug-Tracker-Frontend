import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';

// Template source: https://github.com/mui/material-ui/blob/v5.11.6/docs/data/material/getting-started/templates/sign-up/SignUp.js

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        Issue Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn(props) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMeCheckbox, setRememberMeCheckbox] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const errorEmail = submitClicked && email === '';
  const errorPassword = submitClicked && password === '';

  if (props.isUserLoggedIn) {
    navigate('/issues-overview', {state: null});
  }

  function handleOnChange(event) {

    const eventName = event.target.name;
    const eventValue = event.target.value;

    switch(eventName) {
      case 'email':
        setEmail(eventValue);
        break;
      case 'password':
        setPassword(eventValue);
        break;
      case 'rememberMeCheckbox': 
        setRememberMeCheckbox(!rememberMeCheckbox);
        break;
      default:
        console.log('Could not read eventName');
    }
  }

  const handleSubmit = (event) => {

    if (email !== '' && password !== '') {
      fetch('apiLink', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getPOSTBody())
      }).then(response => {
        console.log('Sign in successful with status: ' + (response ? response.status : "No status found"));
        props.onUserLoginStatusChange(true);
        navigate('/issues-overview', {state: null});
      }).catch(err => {
        alert('Sign in unsuccessful');
        console.log(err);
      });
    }

    setSubmitClicked(true);
    // Page will refresh and the submission will fail without preventDefault()
    event.preventDefault();
  };

  function getPOSTBody() {
    // Type check all inputs
    // If any type is incorrect, make the value null
    const emailForBody = isString(email) ? email : null;
    const passwordForBody = isString(password) ? password : null;

    return {
      email: emailForBody,
      password: passwordForBody,
    }
  }

  function isString(value) {
    return (typeof value === 'string' || value instanceof String);
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errorEmail ? "This field is required" : null}
                  error={errorEmail}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  helperText={errorPassword ? "This field is required" : null}
                  error={errorPassword}
                  autoComplete="new-password"
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  name="rememberMeCheckbox"
                  label="Remember Me"
                  id="rememberMeCheckbox"
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/forgot-password" variant="body2">
                  Forgot your password?
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