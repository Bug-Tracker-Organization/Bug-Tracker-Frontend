import * as React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL: `${API_URL}`
});

// Template source: https://github.com/mui/material-ui/blob/v5.11.6/docs/data/material/getting-started/templates/sign-up/SignUp.js

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" to="/">
        Issue Manager
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function Register(props) {

  const [organization, setOrganization] = useState('');
  const [isOrganizationAvailable, setIsOrganizationAvailable] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailAvailable, setIsEmailAvailable] = useState(true);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');   
  const [submitClicked, setSubmitClicked] = useState(false);
  const [wasUserCreated, setWasUserCreated] = useState(false);
  const [wasOrganizationCreated, setWasOrganizationCreated] = useState(false);
  const [userCreatedEmail, setUserCreatedEmail] = useState('');
  const navigate = useNavigate();
  const errorOrganization = submitClicked && (organization === '' || !isOrganizationAvailable);
  const [errorOrganizationMessage, setErrorOrganizationMessage] = useState('This field is required');
  const errorEmail = submitClicked && (email === '' || !isEmailAvailable);
  const [errorEmailMessage, setErrorEmailMessage] = useState('This field is required');
  const [isPasswordTheSameAsEmail, setIsPasswordTheSameAsEmail] = useState(false);
  const errorPassword = submitClicked && (password === '' || isPasswordTheSameAsEmail);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState('This field is required');
  const errorRepeatPassword = submitClicked && (repeatPassword === '' || repeatPassword !== password);

  if (props.isUserLoggedIn) {
    navigate('/issues-overview', {state: null});
  }

  function handleOnChange(event) {

    const eventName = event.target.name;
    const eventValue = event.target.value;

    switch(eventName) {
      case 'organization':
        setOrganization(eventValue);
        break;
      case 'email':
        setEmail(eventValue);
        break;
      case 'password':
        setPassword(eventValue);
        break;
      case 'repeatPassword':
        setRepeatPassword(eventValue);
        break;
      default:
        console.log('Could not read eventName');
    }
  }

  async function getNewUserId(email) {
    const responseResult = await client.get(`/catalog/exists/user/${email}`).then((response) => {
      if (response.data.found) {
        return response ? (response.data ? response.data.user_id : null) : null;
      }
      return null;
    }).catch(err => {
      console.log(err);
      return null;
    });
    return responseResult;
  }

  async function createOrganization(name, founder_id) {
    const responseResult = await client.post(`/catalog/register/organization`, {
      name: name,
      founder: founder_id,
    }).then((response) => {
      setWasOrganizationCreated(true);
      return true;
    }).catch(err => {
      const message = err ? (err.response ? err.response.data : "Unknown error") : "Unknown error";
      alert(message);
      setWasOrganizationCreated(false);
      return false;
    });
    return responseResult;
  }

  async function createUser(email, password) {
    const responseResult = await client.post(`/catalog/register/user`, {
      email: email,
      password: password
    }).then((response) => {
      setWasUserCreated(true);
      setUserCreatedEmail(email);
      return true;
    }).catch(err => {
      const message = err ? (err.response ? err.response.data : "Unknown error") : "Unknown error";
      alert(message);
      setWasUserCreated(false);
      return false;
    });
    return responseResult;
  }

  async function isUserEmailAvailable(email) {
    const responseResult = await client.get(`/catalog/exists/user/${email}`).then((response) => {
      if (response.data.found) {
        setErrorEmailMessage('Email is already in use! Please login.');
        setIsEmailAvailable(false);
        return false;
      }
      setErrorEmailMessage('This field is required');
      setIsEmailAvailable(true);
      return true;
    }).catch(err => {
      console.log(err);
      return false;
    });
    return responseResult;
  }

  async function isUserOrganizationNameAvailable(name) {
    const responseResult = await client.get(`/catalog/exists/organization/${name}`).then((response) => {
      if (response.data.found) {
        setErrorOrganizationMessage('Organization name has been taken! Please create another name.');
        setIsOrganizationAvailable(false);
        return false;
      }
      setErrorOrganizationMessage('This field is required');
      setIsOrganizationAvailable(true);
      return true;
    }).catch(err => {
      console.log(err);
      return false;
    });
    return responseResult;
  }

  const handleSubmit = async (event) => {

    if (email === password) {
      setIsPasswordTheSameAsEmail(true);
      setErrorPasswordMessage('Email and password should not be the same!');
    } else if (organization !== ''
      && email !== '' 
      && password !== '' 
      && repeatPassword !== '' 
      && password === repeatPassword) {

        // Passed the top condition,
        // so reset it
        if (isPasswordTheSameAsEmail) {
          setIsPasswordTheSameAsEmail(false);
          setErrorPasswordMessage('This field is required');
        }

        // Get all user data here just in case user tries to change the data
        // while the submission process is still taking place.abs
        const currentUser = {
          "email": email,
          "organizationName": organization,
          "password": password,
        }

        // Check if email is not taken
        const isUserEmailAvailableResults = await isUserEmailAvailable(currentUser.email);
        // Check if organization is not taken
        const isUserOrganizationAvailableResults = await isUserOrganizationNameAvailable(currentUser.organizationName);
        
        if (isUserEmailAvailableResults && isUserOrganizationAvailableResults) {
          
          const isUserCreationSuccessful = await createUser(currentUser.email, currentUser.password);
          const isOrganizationCreationSuccessful = 
            isUserCreationSuccessful ?
            await createOrganization(currentUser.organizationName, await getNewUserId(currentUser.email)) : 
            false;

          !isOrganizationCreationSuccessful && alert('Account created successfully, but not organization. '
            + 'Please try creating an organization again using your old email and password');
          isOrganizationCreationSuccessful && navigate('/sign-in', {state: null});
        }
    }

    /* 
      Use case in which user was created successfully, but not organization
      Gives the user a chance to link their user model with an organization
      before they have to call support. 
    */
    if (wasUserCreated && !wasOrganizationCreated) {
      const isOrganizationCreationSuccessful = 
        await createOrganization(organization, await getNewUserId(userCreatedEmail));

      isOrganizationCreationSuccessful && navigate('/sign-in', {state: null});
    }

    // If email or organization name are blank, reset the error messages
    email === '' && setErrorEmailMessage('This field is required');
    organization === '' && setErrorOrganizationMessage('This field is required');
    setSubmitClicked(true);
  };

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
            Register
          </Typography>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="organization"
                  label="Organization Name"
                  name="organization"
                  autoComplete="organization"
                  helperText={errorOrganization ? errorOrganizationMessage : null}
                  error={errorOrganization}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={errorEmail ? errorEmailMessage : null}
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
                  autoComplete="new-password"
                  helperText={errorPassword ? errorPasswordMessage : null}
                  error={errorPassword}
                  onChange={handleOnChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="repeatPassword"
                  label="Repeat Password"
                  type="password"
                  id="repeatPassword"
                  autoComplete="new-password"
                  helperText={errorRepeatPassword ? "This field is required and must match the above password" : null}
                  error={errorRepeatPassword}
                  onChange={handleOnChange}
                />
              </Grid>
            </Grid>
            <Button
              type="button"
              onClick={handleSubmit}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/sign-in" variant="body2">
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