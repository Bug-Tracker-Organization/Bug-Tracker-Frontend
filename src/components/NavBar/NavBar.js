import * as React from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
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
            <Link color="inherit" to={"/"}>Issue Manger</Link>
          </Typography>
          <Button color="inherit">
            <Link class='navbar' color="inherit" to={"/sign-up"}>Sign Up</Link>
          </Button>
          <Button color="inherit">
            <Link class='navbar' color="inherit" to={"/register"}>Register</Link>
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}