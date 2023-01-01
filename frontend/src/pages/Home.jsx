import React from 'react'
import { Button, Container, Grid, Typography, Step, Stepper, StepLabel, Box} from '@mui/material'
import moblieImg from '../img/ardunioImg.gif'
import lapImg from '../img/lapArdImg.gif'

const steps = [
  "lets talk about our project",
  "Bringing your ideas to life with Arduino",
  "product at your door step"
]


export const Home = () => {
  return (
    <div>
      <div className='home-con'>
        <div  className="image" >
          {window.innerWidth<=550?  
              <img src={moblieImg} 
              alt="ardunio_img"
              loading="lazy" width={"100%"} />
              :
              <img src={lapImg} 
              alt="ardunio_img"
              loading="lazy" width={"100%"} />
          }
        </div>
        <div className='home-info'>
          <Typography
              variant="h3"
              noWrap
              component={"h3"}
              sx={{
                mr: 2,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              HAPPY SHOP
            </Typography>
            <Typography sx={{fontweight:500}}>Empower your imagination with our team</Typography> <br/>
            <div className='quotes-con'>
              <Typography sx={{fontweight:500}}>	&ldquo;The best brains of the nation may be found on the last benches of the classroom.&rdquo;</Typography>
              <Typography sx={{fontweight:500}} textAlign={"right"}>-By Dr.A.P.J. Abdul Kalam </Typography>
            </div>
        </div>
      </div>
      <Box sx={{ width: '100%' }}>
        <Stepper  alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>  
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
      <Container>
        <Grid container 
        direction="row"
        justifyContent="center"
        alignItems="flex-start" 
        spacing={{ xs: 2, md: 3 }} 
        columns={{ xs: 4, sm: 12, md: 12 }} >
            <Grid item xs={4} sm={6} md={6} key={1}>
              <Container>
               
              </Container>
            </Grid>
            {/* <Grid item xs={4} sm={6} md={6} key={2}>
              <Container><h1>hi</h1></Container>
            </Grid><Grid item xs={4} sm={6} md={6} key={3}>
              <Container><h1>hi</h1></Container>
            </Grid><Grid item xs={4} sm={6} md={6} key={4}>
              <Container><h1>hi</h1></Container>
            </Grid> */}
        </Grid>
      </Container>
    </div>
  )
}

