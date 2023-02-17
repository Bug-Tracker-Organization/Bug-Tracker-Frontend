import * as React from 'react';
import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue, red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';

export default function ChangePassword(props) {
  const [submitClicked, setSubmitClicked] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const errorCurrentPassword = submitClicked && currentPassword === '';
  const [newPassword, setNewPassword] = useState('');
  const errorNewPassword = submitClicked && newPassword === '';
  const [repeatPassword, setRepeatPassword] = useState('');
  const errorRepeatPassword = submitClicked && (repeatPassword === '' || newPassword !== repeatPassword);
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
      case 'currentPassword':
        setCurrentPassword(eventValue);
        break;
      case 'newPassword':
        setNewPassword(eventValue);
        break;
      case 'repeatPassword':
        setRepeatPassword(eventValue);
        break;
      default:
        console.log('Could not read eventName: ' + eventName);
    }
  }

  const handleCloseCreateIssueModal = () => {
    navigate('/profile-editing', {state: null});
  };

  const handleCreateIssue = () => {

    if (currentPassword !== ''
      && newPassword !== ''
      && repeatPassword !== ''
      && newPassword === repeatPassword) {
        // Send request to create to database

          // If submission success:
          navigate('/profile-editing', {state: null});
          
    } else {
      setSubmitClicked(true);
    }
  }

  return (
    <>
      <Container>
        <Toolbar>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Password
          </Typography>
        </Toolbar>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <TextField
              required
              fullWidth
              type='password'
              id="currentPassword"
              label="Current Password"
              name="currentPassword"
              autoComplete="currentPassword"
              defaultValue={currentPassword}
              helperText={errorCurrentPassword ? "This field is required" : null}
              error={errorCurrentPassword}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
            />
            <TextField
              required
              fullWidth
              type="password"
              id="newPassword"
              label="New Password"
              name="newPassword"
              autoComplete="newPassword"
              defaultValue={newPassword}
              helperText={errorNewPassword ? "This field is required" : null}
              error={errorNewPassword}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
            />
            <TextField
              required
              fullWidth
              type="password"
              id="repeatPassword"
              label="Repeat Password"
              name="repeatPassword"
              autoComplete="repeatPassword"
              defaultValue={repeatPassword}
              helperText={errorRepeatPassword ? "This field is required and must match the above password" : null}
              error={errorRepeatPassword}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
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