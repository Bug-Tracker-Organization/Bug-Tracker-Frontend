import './IssuesOverview.css';
import { useState, useEffect } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';

export default function IssuesOverview(props) {

  const [organizationName, setOrganizationName] = useState('Could not retrieve org name');
  const navigate = useNavigate();

  useEffect(() => {
    if (!props.isUserLoggedIn) {
      navigate('/', {state: null});
    }
  }, [props.isUserLoggedIn]);

  return (
    <>
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Issues Overview - {organizationName}  
      </Typography>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1, position: 'absolute', right: 0 }}>
        <Button className="new-issue-btn" variant="contained" sx={{ backgroundColor: blue[500], color: 'white', }}>
          + New Issue
        </Button>
      </Typography>
    </Toolbar>
    </>
  );
}