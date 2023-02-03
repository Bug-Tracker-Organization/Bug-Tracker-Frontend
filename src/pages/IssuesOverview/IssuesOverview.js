import './IssuesOverview.css';
import { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { blue } from '@mui/material/colors';
import { Link } from 'react-router-dom';

export default function IssuesOverview(props) {

  const [organizationName, setOrganizationName] = useState('Could not retrieve org name');

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