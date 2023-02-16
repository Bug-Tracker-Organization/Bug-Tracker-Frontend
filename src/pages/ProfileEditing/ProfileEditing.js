import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue, red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import LockIcon from '@mui/icons-material/Lock';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

export default function ProfileEditing(props) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [email, setEmail] = useState('EMAIL NOT FOUND');
  const [username, setUsername] = useState('USERNAME NOT FOUND');
  const [address, setAddress] = useState('ADDRESS NOT FOUND');
  const [firstAndLastName, setFirstAndLastName] = useState('FIRST AND LAST NAME NOT FOUND');
  const errorFirstAndLastName = submitClicked && firstAndLastName === '';
  const [position, setPosition] = useState('POSITION NAME NOT FOUND');
  const [phone, setPhone] = useState('PHONE NAME NOT FOUND');
  const [receiveEmailNotifications, setReceiveEmailNotifications] = useState(true);
  const [organizationName, setOrganizationName] = useState('ORGANIZATION NAME NOT FOUND');
  const errorOrganizationName = submitClicked && organizationName === '';
  const [facebookLink, setFacebookLink] = useState('FACEBOOK LINK NOT FOUND');
  const [twitterLink, setTwitterLink] = useState('TWITTER LINK NOT FOUND');
  const [linkedInLink, setLinkedInLink] = useState('LINKED IN LINK NOT FOUND');
  const [aboutMe, setAboutMe] = useState('ABOUT ME NOT FOUND');
  const [displayName, setDisplayName] = useState(0);
  const errorDisplayName = submitClicked && displayName === '';

  const navigate = useNavigate();

  // Doesn't work
  /*
  useEffect(() => {
    if (!props.isUserLoggedIn) {
      navigate('/', {state: null});
    }
  }, [props.isUserLoggedIn]);
  */

  function handleOnChange(event) {

    const eventName = event.target.name;
    const eventValue = event.target.value;

    switch(eventName) {
      case 'receiveEmailNotifications':
        setReceiveEmailNotifications(!receiveEmailNotifications);
        break;
      case 'organizationName':
        setOrganizationName(eventValue);
        break;
      case 'username':
        setUsername(eventValue);
        break;
      case 'displayName':
        setDisplayName(eventValue);
        break;
      case 'address':
          setAddress(eventValue);
          break;
      case 'firstAndLastName':
        setFirstAndLastName(eventValue);
        break;
      case 'position':
        setPosition(eventValue);
        break;
      case 'phone':
        setPhone(eventValue);
        break;
      case 'facebookLink':
        setFacebookLink(eventValue);
        break;
      case 'twitterLink':
        setTwitterLink(eventValue);
        break;
      case 'linkedInLink':
        setLinkedInLink(eventValue);
        break;
      case 'aboutMe':
        setAboutMe(eventValue);
        break;
      default:
        console.log('Could not read eventName: ' + eventName);
    }
  }

  const handleCloseCreateIssueModal = () => {
    navigate('/user-profile/' + username, {state: null});
  };

  const handleCreateIssue = () => {

    if (organizationName !== '' 
      && firstAndLastName !== '') {
        // Send request to create to database

          // If submission success:
          navigate('/user-profile/' + username, {state: null});

    } else {
      setSubmitClicked(true);
    }
  }

  const displayNames = [{ id: 0, name: email }, 
    { id: 1, name: username },
    { id: 2, name: firstAndLastName }];

  return (
    <>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="h2">
            Profile Editing
          </Typography>
        </Toolbar>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography>
              <b>Email: </b>{email}
            </Typography>
            <Checkbox
              name="receiveEmailNotifications"
              checked={receiveEmailNotifications}
              onChange={handleOnChange}
            />
            <Typography display='inline'>
              Receive email notifications
            </Typography>
            <Link to='/change-password'>
              <Typography>
                <LockIcon fontSize='small'/> Change password
              </Typography>
            </Link>
            <TextField
              required
              fullWidth
              id="organizationName"
              label="Organization Name"
              name="organizationName"
              autoComplete="organizationName"
              defaultValue={organizationName}
              helperText={errorOrganizationName ? "This field is required" : null}
              error={errorOrganizationName}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    defaultValue={username}
                    onChange={handleOnChange}
                    sx={{ marginTop: 2 }}
                  />
                  <FormControl fullWidth sx={{ marginTop: 2 }}>
                    <InputLabel id="displayName">Display Name</InputLabel>
                    <Select
                      required
                      labelId="displayName"
                      id="displayName"
                      name="displayName"
                      value={displayName}
                      defaultValue={displayName}
                      label="Display Name"
                      error={errorDisplayName}
                      onChange={handleOnChange}
                    >
                      {displayNames.map((item) => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <TextField
                    required
                    fullWidth
                    id="address"
                    label="Address"
                    name="address"
                    autoComplete="address"
                    defaultValue={address}
                    onChange={handleOnChange}
                    sx={{ marginTop: 2 }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="firstAndLastName"
                    label="First and Last Name"
                    name="firstAndLastName"
                    autoComplete="firstAndLastName"
                    defaultValue={firstAndLastName}
                    helperText={errorFirstAndLastName ? "This field is required" : null}
                    error={errorFirstAndLastName}
                    onChange={handleOnChange}
                    sx={{ marginTop: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="position"
                    label="Position within Organization"
                    name="position"
                    autoComplete="position"
                    defaultValue={position}
                    onChange={handleOnChange}
                    sx={{ marginTop: 2 }}
                  />
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="phone"
                    defaultValue={phone}
                    onChange={handleOnChange}
                    sx={{ marginTop: 2 }}
                  />
                </Grid>
              </Grid>
            </Box>
            <TextField
              required
              fullWidth
              id="facebookLink"
              label="Facebook Link"
              name="facebookLink"
              autoComplete="facebookLink"
              defaultValue={facebookLink}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
            />
            <TextField
              required
              fullWidth
              id="twitterLink"
              label="Twitter Link"
              name="twitterLink"
              autoComplete="twitterLink"
              defaultValue={twitterLink}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
            />
            <TextField
              required
              fullWidth
              id="linkedInLink"
              label="LinkedIn Link"
              name="linkedInLink"
              autoComplete="linkedInLink"
              defaultValue={linkedInLink}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
            />
            <TextField
              required
              id="outlined-multiline-static"
              label="About me"
              name="aboutMe"
              fullWidth
              multiline
              defaultValue={aboutMe}
              onChange={handleOnChange}
              rows={4}
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <Button variant="contained" onClick={handleCreateIssue} sx={{
                backgroundColor: blue[500], color: 'white',
                marginTop: 2,
                marginRight: 1
              }}>
              Save
            </Button>
            <Button variant="contained" onClick={handleCloseCreateIssueModal} 
              sx={{ 
                backgroundColor: 'red', 
                color: 'white',
                ':hover': {
                  bgcolor: red[700],
                  color: 'white',
                }, 
                marginTop: 2 }}>
              Cancel
            </Button>
          </Container>
        </Paper>
      </Container>
    </>
  );
}