import React from 'react'
import { Grid, TextField, Typography, Container, Box, Button, Divider } from '@mui/material'
import logo from '../img/lightLogo1.png'
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Link } from 'react-router-dom';
import { SocialIcon } from 'react-social-icons';
function Footer() {
  return (
    <div className='footer'>
      <Container sx={{
        paddingTop:'2rem',
        paddingBottom:'2rem'
      }} >
        <Grid container spacing={2}  mt={2} mb={3}  ml={0} sx={{width:'100%', margin:"auto", display:'flex', justifyContent:'center'}}>
          <Grid item xs={12} sm={8} md={4} 
            sx={{
              backgroundColor:'#fcf8fa',
              padding:' 12px',
              marginTop:' 24px',
              borderRadius:'8px',
              }} 
          >
            <Typography component={'h4'} mb={1}
              sx={{
                color:'text.primary',
                textAlign:'center',
                fontFamily:'rubik',
                fontWeight:'600',
                fontSize:'1.2rem'
              }}
            >Subscribe for future updates</Typography>
            <Grid container mb={1} spacing={1}>
              <Grid item sm={6} xs={12} md={6}>
                <TextField id="outlined-basic" color='primary' label="Email" variant="outlined" />
              </Grid>
              <Grid item sm={6} xs={12} md={6}
                sx={{
                  display:'flex'
                }}
              >
                <Button variant='contained'>Subscribe</Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item md={4} xs={12} sm={6}>
            <Box
                    sx={{
                      display:'flex',
                      justifyContent:'center',
                      flexDirection:'column',
                      alignItems:'center'
                    }}
            >
              <Typography
                sx={{ 
                  fontFamily:'rubik',
                  fontWeight:'600',
                  fontSize:'1.1rem',
                  color:'#fff'
                }}
              >Links</Typography>
              <Link to={'/products'} className='a-styles'>
                <Typography
                  sx={{ 
                    fontFamily:'karla',
                    fontWeight:'500',
                    fontSize:'1.1rem',
                    color:'#dee2e6',
                    textDecoration:'none'
                  }}
                >Products</Typography>
              </Link>
              <Link to={'/projects'} className='a-styles'>
                <Typography
                  sx={{ 
                    fontFamily:'karla',
                    fontWeight:'500',
                    fontSize:'1.1rem',
                    color:'#dee2e6',
                    textDecoration:'none'
                  }}
                >Projects</Typography>
              </Link>
              <Link to={'/contact'} className='a-styles'>
                <Typography
                  sx={{ 
                    fontFamily:'karla',
                    fontWeight:'500',
                    fontSize:'1.1rem',
                    color:'#dee2e6',
                    textDecoration:'none'
                  }}
                >Contact us</Typography>
              </Link>
              <Link to={'/login'} className='a-styles'>
                <Typography
                  sx={{ 
                    fontFamily:'karla',
                    fontWeight:'500',
                    fontSize:'1.1rem',
                    color:'#dee2e6',
                    textDecoration:'none',
                  }}
                >Login</Typography>
              </Link>
            </Box>
          </Grid>

          <Grid item md={4} xs={12} sm={6} >
          <Box 
              sx={{
                display:'flex',
                justifyContent:'center',
                flexDirection:'column',
                alignItems:'center'
              }}
          >
              <Typography
                sx={{ 
                  fontFamily:'rubik',
                  fontWeight:'600',
                  fontSize:'1.1rem',
                  color:'#fff'
                }}
              >Make money with us</Typography>
              <Link to={'/hireme'} className='a-styles'>
                <Typography
                  sx={{ 
                    fontFamily:'karla',
                    fontWeight:'500',
                    fontSize:'1.1rem',
                    color:'#dee2e6',
                    textDecoration:'none'
                  }}
                >Hiring info</Typography>
              </Link>
              <Link to={'/onsell'} className='a-styles'>
                <Typography
                  sx={{ 
                    fontFamily:'karla',
                    fontWeight:'500',
                    fontSize:'1.1rem',
                    color:'#dee2e6',
                    textDecoration:'none'
                  }}
                >Sell projects on Let's code</Typography>
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{backgroundColor:'#f68303'}}   />
      <Container>
        <Typography mt={2} 
          sx={{
            textAlign:'center',
            fontFamily:'rubik',
            fontWeight:'600',
            fontSize:'1.2rem'
          }}
        >Social media links</Typography>
        <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            padding:'12px 0 0 0'
          }}
        >
          <SocialIcon  className='card-icon' url={'https://www.instagram.com/itsvimal_/'} style={{marginRight:'8px',height: 32, width: 32}}/> 
          <SocialIcon  url={'https://www.linkedin.com/in/vimal-raj-r-webie/'} bgColor='#fff' style={{marginRight:'8px',height: 32, width: 32}}/> 
          <SocialIcon  className='card-icon' url={'https://github.com/vimal-oneway'} style={{marginRight:'8px',height: 32, width: 32 }}/> 
        </Box>
        <Typography
          mt={1}
          sx={{
            textAlign:'center',
            paddingBottom:'12px',
            fontFamily:'karla',
            fontWeight:'400',
            color:'#dee2e6'
          }}
        >Let's code - Copyright issued on 2023 to 2025</Typography>
      </Container>
    </div>
  )
}
export default Footer