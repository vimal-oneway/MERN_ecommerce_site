import React, { useEffect, useState } from 'react'
import Axios from '../config/axios'
import { Container } from '@mui/system'
import { Box, Button, CircularProgress, Divider, Grid, Stack, Typography } from '@mui/material'

export const Product = ({ShowMessage}) => {
  const [product, setProduct] = useState()

  const getProductData = async () => {
    const data = await Axios.getProductDataById(location.pathname)
    console.log(data);
    !data.message && setProduct(data.product)
    data.message && ShowMessage({message:data.message, success:data.success, isOpen:true})
  }

  useEffect(()=>{
    getProductData()
  },[])

  return (
    <Container className={'mt-10'}>
     {
      !product 
      ?
        <CircularProgress/>
      :
      <Box sx={{display:'flex', justifyContent:'center'}}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={6}>
            <img src={`http://localhost:8080${product.images[0].image}`} alt="product_img" width={"100%"} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <Stack spacing={2}>
              <Typography component={'h3'} sx={{fontWeight:'700', fontFamily:'poppins', fontSize:'1.5rem'}}>{product.name.toUpperCase()}</Typography>
              <Divider/>
              <Box>
                <Typography sx={{fontWeight:'600', fontFamily:'poppins'}}>&#8377;{product.price}</Typography>
                <Typography>
                  {"delivery within "}
                  <Typography sx={{fontWeight:'700', backgroundColor:'#A8DADC', padding:'3px'}} component={'span'}>
                    {"2 - 3 days"}
                  </Typography>
                </Typography>
                <div className="mb-3"></div>
                <Typography sx={{fontFamily:"poppins"}}>{product.description}</Typography>
              </Box>
              <Divider/>
              <Box>
                <Button variant='outlined'>{"add to cart"}</Button>{" "}
                <Button variant='contained'>{"buy now"}</Button>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
     }
    </Container>
  )
}
