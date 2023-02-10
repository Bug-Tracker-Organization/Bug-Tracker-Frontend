import * as React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EditIcon from '@mui/icons-material/Edit';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link, useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function UserProfile(props) {

  const [name, setName] = useState('CANNOT FIND USER NAME');
  const [position, setPosition] = useState('CANNOT FIND USER POSITION');
  const [aboutMe, setAboutMe] = useState('CANNOT FIND USER ABOUT ME');
  const [phone, setPhone] = useState('CANNOT FIND USER PHONE NUMBER');
  const [email, setEmail] = useState('CANNOT FIND USER EMAIL');
  const [address, setAddress] = useState('CANNOT FIND USER ADDRESS');
  const [facebookLink, setFacebookLink] = useState('https://www.facebook.com/');
  const [twitterLink, setTwitterLink] = useState('https://www.twitter.com/');
  const [linkedInLink, setLinkedInLink] = useState('https://www.linkedin.com/');

  return (
    <>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="h2">
            User Profile
          </Typography>
        </Toolbar>
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Container sx={{ marginTop: 2, marginBottom: 2 }}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
                    <b>{name}</b>
                  </Typography>
                  <Typography sx={{ marginTop: 0.5 }}>
                    {position}
                  </Typography>
                  <Typography sx={{ marginTop: 2 }}>
                    {aboutMe}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography sx={{ margin: 2 }}>
                    <LocalPhoneIcon fontSize='small'/> <b>Phone:</b> {phone}
                    <span style={{ float: 'right' }}>
                      <Link to={"/profile-editing"}>
                        <EditIcon sx={{ cursor: 'pointer', color: 'grey' }}/>
                      </Link>
                    </span>
                  </Typography>
                  <Typography sx={{ margin: 2 }}>
                    <EmailIcon fontSize='small'/> <b>Email:</b> {email}
                  </Typography>
                  <Typography sx={{ margin: 2 }}>
                    <LocationOnIcon fontSize='small'/> <b>Address:</b> {address}
                  </Typography>
                  <Typography sx={{ margin: 2 }}>
                    <a target="_blank" href={facebookLink}>
                      <FacebookIcon fontSize='large' sx={{ margin: 2 }}/>
                    </a>
                    <span>
                      <a target="_blank" href={twitterLink}>
                        <TwitterIcon fontSize='large' sx={{ margin: 2 }}/>
                      </a>
                    </span>
                    <span>
                      <a target="_blank" href={linkedInLink}>
                        <LinkedInIcon fontSize='large' sx={{ margin: 2 }}/>
                      </a>
                    </span>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Paper>
      </Container>
    </>
  );
}