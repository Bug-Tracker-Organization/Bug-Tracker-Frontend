import * as React from 'react';
import { useState } from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

export default function NavBar() {

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  return (
    <>
    <Box className="sticky-nav" sx={{ flexGrow: 1, }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link color="inherit" to={"/"}><img className="navbar-logo" src={require('../../assets/logo.png')} /> Issue Manager</Link>
          </Typography>
          <Link className='navbar' color="inherit" to={"/sign-in"}>
            <Button color="inherit">
              Sign in
            </Button>
          </Link>
          <Link className='navbar' color="inherit" to={"/register"}>
            <Button color="inherit">
              Register
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
    <Box sx={{ flexGrow: 1, }}>
      <AppBar position="static">
        <Toolbar>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  );
}