import * as React from 'react';
import { useState } from 'react';
import './Home.css';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const client = axios.create({
  baseURL: `${API_URL}`
});

export default function Home(props) {

  const navigate = useNavigate();
  const [madeRequest, setMadeRequest] = useState(false);

  // TODO: Remove this
  // if (props.isUserLoggedIn) {
  //   navigate('/issues-overview', {state: null});
  // }

  React.useEffect(() => {
    // Email verification will be done on the Home page
    if (window.location.hash !== '#/' && !madeRequest) {
      setMadeRequest(true);
      const email = window.location.hash.split('/')[2];
      const token = window.location.hash.split('/')[3];      

      client.get(`/auth/verify/${email}/${token}`).then((response) => {
        console.log(response);
        const message = response.data.message;
        alert("Server message: " + message);
        if (message === "Email Verification Successful") {
          // TODO: Set JWT in client

          // Probably shouldn't navigate to the issues-overview page immediately
          // TODO: Get the JWT working
          navigate('/issues-overview', {state: null});
        }
      }).catch(err => {
        console.log(err);
        alert("Server message: " + err);
      });
    }
  }, []);

  return (
    <>
    <Grid sx={{ flexGrow: 1, marginTop: 10, }} container spacing={2}>
      <Grid item xs={12}>
        <Grid container justifyContent="center" spacing={2}>
          <Grid key={1} item>
            <Container>
              <Typography variant="h3" component="div" sx={{ flexGrow: 1 }}>
                <div className="home-logo-name">Issue Manager</div>
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, marginBottom: 2  }}>
                <span className="home-description">
                  This is a web application built with the MERN stack.
                </span>
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
            <Container>
              <img className="home-img" src={require('../../assets/logo.png')} />
            </Container>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </>
  );
}