import React from 'react';
import {Container, Grid, Box, Typography, Button} from '@mui/material';
import homePage from '../assets/gif/homePage.gif'
import TeamCard from '../components/TeamCart'
import { fontSize } from '@mui/system';

const teamData = [
  {
    name:'Vimal Raj',
    role: 'Web dev',
    instaLink:'https://www.instagram.com/itsvimal_/',
    linkedinLink: 'https://www.linkedin.com/in/vimal-raj-r-webie/',
    gitLink: 'https://github.com/vimal-oneway',
    img:'../assets/img/vimal.jpg'
  },
  {
    name:'Vimal Raj',
    role: 'Web dev',
    instaLink:'https://www.instagram.com/itsvimal_/',
    linkedinLink: 'https://www.linkedin.com/in/vimal-raj-r-webie/',
    gitLink: 'https://github.com/vimal-oneway',
    img:'../assets/img/vimal.jpg'
  },  
  {
    name:'Vimal Raj',
    role: 'Web dev',
    instaLink:'https://www.instagram.com/itsvimal_/',
    linkedinLink: 'https://www.linkedin.com/in/vimal-raj-r-webie/',
    gitLink: 'https://github.com/vimal-oneway',
    img:'../assets/img/vimal.jpg'
  }
]

export const Home = () => {
  return (
    <div>
      <Container className='mt'>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <Box 
              sx={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                height:'100%'
              }}
            >
              <img src={homePage} alt='home-page-img' width={'75%'}/>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Box 
              sx={{
                display:'flex',
                justifyContent:"center", 
                alignItems:'center',
                height:'100%', 
                flexDirection:'column'
              }}
            >
              <Typography component={'h1'} 
                sx={{
                  fontFamily:'rubik',
                  fontWeight:'700', 
                  fontSize:'2rem', 
                  color:'text.primary' 
                }}
              >
                Let's code
              </Typography>
              <Typography component={'p'} mb={1}
                sx={{
                  fontFamily:'karla',
                  fontWeight:'500', 
                  fontSize:'1rem', 
                  color:'text.secondary' 
                  }}
              >Creativity of  your idea must be true in your hand</Typography>
              <Button variant='outlined' >Let's talk</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <div className="team-card-con mt-3">
        <Container>
          <Typography component={'h2'} mb={2}
            sx={{
              fontFamily:'rubik',
              fontSize:'2rem',
              textAlign:'center',
              fontWeight:'700',
              color:'text.primary'
            }}
          >OUR TEAM</Typography>
          <TeamCard teamData={teamData}/>
        </Container>
      </div>
      <Container>
        <Typography component={'h2'} mt={2} mb={2}
          sx={{
            fontFamily:'rubik',
            fontSize:'2rem',
            textAlign:'center',
            fontWeight:'700',
            color:'text.primary'
          }}
        >PROJECTS</Typography>
        <Grid container spacing={2}>
          <Grid item md={4} >sdafds</Grid>
          <Grid item md={4} >sdafds</Grid>
          <Grid item md={4} >sdafds</Grid>
        </Grid>
      </Container>
    </div>
  )
}
