import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue, red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
// Date
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import LockIcon from '@mui/icons-material/Lock';

export default function ProfileEditing(props) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [email, setEmail] = useState('EMAIL NOT FOUND');
  const [username, setUsername] = useState('USERNAME NOT FOUND');
  const [firstAndLastName, setFirstAndLastName] = useState('FIRST AND LAST NAME NOT FOUND');
  const [receiveEmailNotifications, setReceiveEmailNotifications] = useState(true);
  const [organizationName, setOrganizationName] = useState('ORGANIZATION NAME NOT FOUND');
  const errorOrganizationName = submitClicked && organizationName === '';
  const [facebookLink, setFacebookLink] = useState('FACEBOOK LINK NOT FOUND');
  const [twitterLink, setTwitterLink] = useState('TWITTER LINK NOT FOUND');
  const [linkedInLink, setLinkedInLink] = useState('LINKED IN LINK NOT FOUND');
  const [aboutMe, setAboutMe] = useState('ABOUT ME NOT FOUND');
  const errorAboutMe = submitClicked && aboutMe === '';
  const [issueName, setIssueName] = useState('ISSUE NAME NOT FOUND');
  const [currentUserName, setCurrentUserName] = useState('CURRENT USER NAME NOT FOUND');
  
  // For Modal 1 - Create Issue
  // Datepicker
  const [deadline, setDeadline] = React.useState(dayjs());
  const handleDateChange = (newDeadline) => {
    setDeadline(newDeadline);
  };
  const errorDeadline = submitClicked && dayjs(deadline).isValid();  
  const [displayName, setDisplayName] = useState(0);
  const errorDisplayName = submitClicked && displayName === '';
  const [status, setStatus] = useState('Assigned');

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
      case 'aboutMe':
        setAboutMe(eventValue);
        break;
      case 'displayName':
        setDisplayName(eventValue);
        break;
      case 'status':
        setStatus(eventValue);
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
      default:
        console.log('Could not read eventName: ' + eventName);
    }
  }

  const handleCloseCreateIssueModal = () => {
    navigate('/user-profile', {state: null});
  };

  const handleCreateIssue = () => {

    if (organizationName !== '' 
      && aboutMe !== '' 
      && dayjs(deadline).isValid()) {
        // Send request to create to database

          // If submission success:
          navigate('/user-profile', {state: null});

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
              helperText={errorAboutMe ? "This field is required" : null}
              error={errorAboutMe}
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