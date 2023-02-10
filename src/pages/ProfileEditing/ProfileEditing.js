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

export default function ProfileEditing(props) {
  const [organizationName, setOrganizationName] = useState('ORGANIZATION NAME NOT FOUND');
  const [issueName, setIssueName] = useState('ISSUE NAME NOT FOUND');
  const [currentUserName, setCurrentUserName] = useState('CURRENT USER NAME NOT FOUND');
  
  // For Modal 1 - Create Issue
  const [submitClicked, setSubmitClicked] = useState(false);
  const [title, setTitle] = useState('TITLE NOT FOUND');
  const errorTitle = submitClicked && title === '';
  const [description, setDescription] = useState('DESCRIPTION NOT FOUND');
  const errorDescription = submitClicked && description === '';
  // Datepicker
  const [deadline, setDeadline] = React.useState(dayjs());
  const handleDateChange = (newDeadline) => {
    setDeadline(newDeadline);
  };
  const errorDeadline = submitClicked && dayjs(deadline).isValid();  
  const [assignedTo, setAssignedTo] = useState(0);
  const errorAssignedTo = submitClicked && assignedTo === '';
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
      case 'title':
        setTitle(eventValue);
        break;
      case 'description':
        setDescription(eventValue);
        break;
      case 'assignedTo':
        setAssignedTo(eventValue);
        break;
      case 'status':
        setStatus(eventValue);
        break;
      default:
        console.log('Could not read eventName: ' + eventName);
    }
  }

  const handleCloseCreateIssueModal = () => {
    navigate('/issues-overview', {state: null});
  };

  const handleCreateIssue = () => {

    if (title !== '' 
      && description !== '' 
      && assignedTo !== '' 
      && dayjs(deadline).isValid()) {
        // Send request to create to database

          // If submission success:
          navigate('/issue-detail', {state: null});

    } else {
      setSubmitClicked(true);
    }
  }

  const users = [{ id: 0, name: 'BR@mail.com' }, 
    { id: 1, name: 'AU@mail.com' },
    { id: 2, name: 'DE@mail.com' },
    { id: 3, name: 'Lee@mail.com' }];

  return (
    <>
      <Container>
        <Toolbar>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Profile Editing
          </Typography>
        </Toolbar>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              defaultValue={title}
              helperText={errorTitle ? "This field is required" : null}
              error={errorTitle}
              onChange={handleOnChange}
              sx={{ marginTop: 2 }}
            />
            <TextField
              required
              id="outlined-multiline-static"
              label="Description"
              name="description"
              fullWidth
              multiline
              defaultValue={description}
              helperText={errorDescription ? "This field is required" : null}
              error={errorDescription}
              onChange={handleOnChange}
              rows={4}
              sx={{ marginTop: 2, marginBottom: 2 }}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Deadline"
                inputFormat="MM/DD/YYYY"
                value={deadline}
                defaultValue={deadline}
                name="deadline"
                error={errorDeadline}
                onChange={handleDateChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="assignedTo">Assigned to</InputLabel>
              <Select
                required
                labelId="assignedTo"
                id="assignedTo"
                name="assignedTo"
                value={assignedTo}
                defaultValue={assignedTo}
                label="Assigned to"
                error={errorAssignedTo}
                onChange={handleOnChange}
              >
                {users.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }}>
              <InputLabel id="status">Status</InputLabel>
              <Select
                labelId="status"
                id="status"
                name="status"
                value={status}
                label="Status"
                onChange={handleOnChange}
              >
                <MenuItem value='Assigned'>Assigned</MenuItem>
                <MenuItem value='In progress'>In progress</MenuItem>
                <MenuItem value='Completed'>Completed</MenuItem>
                <MenuItem value='Approved'>Approved</MenuItem>
              </Select>
            </FormControl>
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