import * as React from 'react';
import { useState } from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { blue } from '@mui/material/colors';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar(props) {

  const [userFirstNameLetter, setUserFirstNameLetter] = useState('');
  const [email, setEmail] = useState('EMAIL NOT FOUND');
  const [username, setUsername] = useState('USERNAME NOT FOUND');
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleLogOutButton() {
    props.onUserLoginStatusChange(false);
    navigate('/', {state: null});
    setAnchorEl(null);
  }

  return (
    <>
    <Box className="sticky-nav" sx={{ flexGrow: 1, }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" className="navbar-typography-logo">
            <Link color="inherit" to={"/"}><img className="navbar-logo" src={require('../../assets/logo.png')} /><span className="logo-name"> Issue Manager</span></Link>
          </Typography>
          {!props.isUserLoggedIn ? <>
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
            </> 
            :
            <React.Fragment>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? 'account-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                  >
                    <Avatar sx={{ width: 32, height: 32, bgcolor: blue[500] }}>
                      {userFirstNameLetter !== '' ? userFirstNameLetter : null}
                    </Avatar> 
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginLeft: 1 }}>
                      <span className="navbar-email">
                        {email !== '' ? email : null}
                      </span>
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Link to={"/user-profile/" + username}>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> Profile
                  </MenuItem>
                </Link>
                <Link to={"/user-management"}>
                  <MenuItem onClick={handleClose}>
                    <Avatar /> User Management
                  </MenuItem>
                </Link>
                <Divider />
                <MenuItem onClick={handleLogOutButton}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </React.Fragment>
            }
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