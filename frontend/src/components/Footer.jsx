import React from 'react'
import { Container } from '@mui/system'
import { Grid, TextField, Typography } from '@mui/material'
import logo from '../img/lightLogo1.png'
import CopyrightIcon from '@mui/icons-material/Copyright';
function Footer() {
  return (
    <div className='footer'>
            <Container>
            <Grid container spacing={2} columns={{ xs: 4, sm: 12, md: 12 }}>
              <Grid item xs={4} sm={6} md={4}>
                <img src={logo} alt='logo' width={"100%"}/>
              </Grid>
              <Grid item xs={2} sm={2}  md={2}>
              </Grid>
              <Grid item xs={6} sm={4}  md={4}>
                <div className="footer-card-con">
                  <Typography sx={{
                    fontWeight:'bold',
                  }}>
                    Links
                  </Typography>
                <div className="mb-3 ">
                </div>
                  <ul>
                    <li>
                      <Typography component={'a'} href='/products' sx={{
                        color:'#dee2e6',
                        textDecoration:'none'
                      }}>
                        Products
                      </Typography>
                    </li>
                    <li>
                      <Typography component={'a'} href='/contact' sx={{
                        color:'#dee2e6',
                        textDecoration:'none'
                      }}>
                        Contact us
                      </Typography>
                    </li>
                    <li>
                      <Typography component={'a'} href='/login' sx={{
                        color:'#dee2e6',
                        textDecoration:'none'
                      }}>
                        Login
                      </Typography>
                    </li>
                    <li>
                      <Typography component={'a'} href='/register' sx={{
                        color:'#dee2e6',
                        textDecoration:'none'
                      }}>
                        Register
                      </Typography>
                    </li>
                  </ul>
                </div>
              </Grid>
              <Grid item xs={12}>
               <div className="copy-right-con">
                <Typography sx={{
                  color:"#dee2e6"
                }}>
                  Copy right on 2022 <CopyrightIcon/>
                </Typography>
               </div>
              </Grid>
            </Grid>
            </Container>
    </div>
    
  )
}

export default Footer