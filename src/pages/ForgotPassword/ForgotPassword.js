import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

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

export default function ForgotPassword(props) {
  
  const [email, setEmail] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);
  const navigate = useNavigate();
  const errorEmail = submitClicked && email === '';

  function handleOnChange(event) {

    const eventName = event.target.name;
    const eventValue = event.target.value;

    switch(eventName) {
      case 'email':
        setEmail(eventValue);
        break;
      default:
        console.log('Could not read eventName');
    }
  }

  const handleSubmit = (event) => {

    if (email !== '') {
      fetch('apiLink', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getPOSTBody())
      }).then(response => {
        console.log('Sign in successful with status: ' + (response ? response.status : "No status found"));
        navigate('/issues-overview', {state: null});
      }).catch(err => {
        alert('Sign in unsuccessful' );
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

    return {
      email: emailForBody,
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
            Forgot Password
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography component="h1" variant="h6">
                  Enter your email to change your password
                </Typography>
              </Grid>
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
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}