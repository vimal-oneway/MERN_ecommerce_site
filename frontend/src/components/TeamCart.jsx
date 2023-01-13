import React from 'react'
import {
    Grid,
    Typography,
    Box
  } from "@mui/material";
import cardImg from '../assets/img/vimal.jpg'

import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';
import {Link, useNavigate} from 'react-router-dom';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faInstagram, } from '@fortawesome/free-brands-svg-icons'
import {faEnvelope} from '@fortawesome/free-solid-svg-icons'

import {SocialIcon} from 'react-social-icons'



function TeamCart({teamData}) {
  let navigate = useNavigate()
  return (
    <Grid container spacing={2}>
      {
      teamData?.map((member, index) =>
      {
        return ( 
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Box className='team-card'>
            <img className='team-card-img' src={cardImg} alt="dev-photo" width={'100%'} height={'100%'} />
            <Box className={'card-text-con'}>

                <Typography component={'h3'} mt={1}
                  sx={{
                    fontFamily:'rubik',
                    fontWeight:'700',
                    fontSize:'1.7rem',
                    color:'text.primary'
                  }}
                >{member.name}</Typography>
                <Typography
                  sx={{
                    fontFamily:'karla',
                    fontWeight:'500',
                    fontSize:'1.2rem',
                    color:'text.secondary'
                  }}
                >{member.role}</Typography>
                <Box >
                    <SocialIcon  className='card-icon' url={member.instaLink} style={{marginRight:'8px'}}/> 
                    <SocialIcon  className='card-icon' url={member.linkedinLink} style={{marginRight:'8px'}}/> 
                    <SocialIcon  className='card-icon' url={member.gitLink} style={{fontSize:'16px'}}/> 
                </Box>
            </Box>
          </Box>
        </Grid>
      )
      })
      }
    </Grid>
  )
}

export default TeamCart