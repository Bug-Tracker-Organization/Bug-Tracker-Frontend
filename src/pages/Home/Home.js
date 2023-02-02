import * as React from 'react';
import NavBar from '../../components/NavBar/NavBar.js';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

export default function Home() {

  return (
    <>
    <NavBar userStatus={false}/>
    <Grid sx={{ flexGrow: 1, marginTop: 10, }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid key={1} item>
            <Container
                sx={{
                  height: 500,
                  width: 400,
                }}
              >
              <Typography variant="h3" component="div" sx={{ flexGrow: 1, marginTop: 10, marginBottom: 2 }}>
                Issue Manager
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginBottom: 2  }}>
                This is a web application built with the MERN stack.
              </Typography>
              <Link className='navbar' color="inherit" to={"/sign-in"}>
                <Button variant="contained" sx={{ flexGrow: 1, marginRight: 2  }}>
                  Sign in
                </Button>
              </Link>
              <Link className='navbar' color="inherit" to={"/register"}>
                <Button variant="outlined">
                  Register
                </Button>
              </Link>
            </Container>
          </Grid>
          <Grid key={0} item>
            <Container
            >
              <img src={require('../../assets/logo.png')} />
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}