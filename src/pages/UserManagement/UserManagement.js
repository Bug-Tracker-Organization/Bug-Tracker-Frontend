import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

export default function UserManagement(props) {
  const [organizationName, setOrganizationName] = useState('ORGANIZATION NAME NOT FOUND');
  const [submitClicked, setSubmitClicked] = useState(false);
  const [emails, setEmails] = useState('');
  const errorEmails = submitClicked && emails === '';
  const navigate = useNavigate();
  
  const [admins, setAdmins] = useState([
    createData('unicode@mail.com', 'badman1122', 'Christian Young', 'Senior Software Engineer', 'Admin'),
  ]);
  const [users, setUsers] = useState([
    createData('j@mail.com', 'jay56', 'Jay John', 'UX Designer', 'User'),
    createData('hopper@mail.com', 'hops90', 'Jacob Hopper', 'Scum Master', 'User'),
    createData('john@mail.com', 'john12', 'John John', 'Software Engineer', 'User'),
  ]);

  function createData(email, username, firstAndLastName, position) {
    return <>
        <Typography sx={{ margin: 1 }}>
          {email} ({username}) {position} - {firstAndLastName} 
        </Typography>
      </>
  }

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
      case 'emails':
        setEmails(eventValue);
        break;
      default:
        console.log('Could not read eventName: ' + eventName);
    }
  }

  const handleCreateIssue = () => {

    if (emails !== '') {
        // Send request to create to database

          // If submission success:
          navigate('/issue-detail', {state: null});

    } else {
      setSubmitClicked(true);
    }
  }

  return (
    <>
      <Container>
        <Toolbar>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            User Management
          </Typography>
        </Toolbar>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <Typography>
              Invite new users:
            </Typography>
            <TextField
              required
              id="outlined-multiline-static"
              label="Enter email addresses separated by comma."
              name="emails"
              fullWidth
              multiline
              defaultValue={emails}
              helperText={errorEmails ? "This field is required" : null}
              error={errorEmails}
              onChange={handleOnChange}
              rows={4}
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <Button variant="contained" onClick={handleCreateIssue} sx={{
                backgroundColor: blue[500], color: 'white',
              }}>
              Check
            </Button>
            <Typography variant="h6" component="h2" sx={{ marginTop: 5, marginBottom: 2 }}>
              Users of organization {organizationName}
            </Typography>
            <Typography variant="h6" component="h2" sx={{ color: blue[500] }}>
              Admins
            </Typography>
            {admins}
            <Typography variant="h6" component="h2" sx={{ color: 'green' }}>
              Users
            </Typography>
            {users}
          </Container>
        </Paper>
      </Container>
    </>
  );
}