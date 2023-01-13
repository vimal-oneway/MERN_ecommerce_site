import React, { useEffect, useState } from 'react'
import Axios from '../config/axios'
import { Container } from '@mui/system'
import { Box, Button, CircularProgress, Divider, Grid, Stack, Typography, Rating, Avatar } from '@mui/material'

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
      <div>
        <Box sx={{display:'flex', justifyContent:'center'}} mb={2}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={6}>
              <img src={`http://localhost:8080${product.images[0].image}`} alt="product_img" width={"100%"} />
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
                <Typography component={'h3'}  
                  sx={{
                    fontWeight:'700', 
                    fontFamily:'rubik', 
                    fontSize:'1.5rem',
                    color:'text.primary'
                  }}
                >
                  {product.name.toUpperCase()}
                </Typography>
                <Typography component={'p'}  mb={1}
                  sx={{
                    fontWeight:'500', 
                    fontFamily:'karla', 
                    fontSize:'.8rem',
                    color:'text.secondary'
                  }}
                >
                  {`Product by - ${product.seller.toUpperCase()}`}
                </Typography>

                <Divider/>

                <Box sx={{display:'flex',alignItems:'center', height:"25px"}} mt={1}>
                  <Rating name="product-rating" precision={0.5}  value={Number(product?.ratings)} readOnly />
                  <Typography variant="p" ml={1} mt={0.5} color="text.primary" > 
                    {product?.numOfReviews}
                  </Typography>
                </Box>

                <Box mt={1} mb={1}>
                  <Typography 
                    sx={{
                      fontWeight:'500', 
                      fontFamily:'karla',
                    }}
                  >
                    &#8377;{product.price}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily:'karla',
                      fontWeight:'500',
                      color:'text.secondary',
                    }}
                  >
                    {"delivery within 2 - 3 days"}
                  </Typography>
                </Box>
                <Divider/>
                <Box mt={1} mb={1}>
                  <Typography 
                    sx={{
                      fontFamily:"rubik",
                      fontWeight:'600',
                      fontSize:'1.2rem'
                    }}
                  >{"Description:"}</Typography>
                  <Typography ml={2} sx={{fontFamily:"karla"}}>{product.description}</Typography>
                </Box>

                <Divider/>

                <Box mt={2}>
                  <Button variant='outlined' sx={{margin:'0 12px 0 0'}}>{"add to cart"}</Button>{" "}
                  <Button variant='contained'>{"buy now"}</Button>
                </Box>
            </Grid>
          </Grid>
        </Box>  

        <Divider/>

        <Container>
          <Typography mt={2} component={'h3'}
            sx={{
              textAlign:'center',
              fontFamily:'rubik',
              fontWeight:'700',
              fontSize:'1.5rem',
              color:'text.primary'
            }}
          >Reviews</Typography>
          <Grid mt={3} container spacing={1}>
            {
              product.reviews?.map((review,index)=>{
                return(
                  <Grid item xs={12} sm={6} md={4} key={index}
                    sx={{
                      border:'2px #dee2e6 solid',
                      borderRadius:'12px',
                      padding:'12px',
                      width:'100%',
                      margin:'6px'
                    }}
                  >
                    <Box mb={1} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                      <Box  sx={{display:'flex',alignItems:'center'}}>
                        <Avatar sx={{ width: 32, height: 32 }}>w</Avatar> 
                        <Typography ml={1}
                          sx={{
                            fontFamily:'rubik',
                            fontWeight:'400',
                            color:'text.primary',
                            fontSize:'1.2rem'
                          }}
                        >{review.user.name}</Typography>
                      </Box>
                      <Box>
                        <Rating name="product-rating" precision={0.5}  value={Number(review.rating)} readOnly />
                      </Box>
                    </Box>

                    <Divider/>
                    <Box>
                      <Typography mt={1}
                        sx={{
                          fontFamily:'karla',
                          fontWeight:'500',
                          color:'text.secondary'
                        }}
                      >{review.comment}</Typography>
                    </Box>
                  </Grid>
                )
              })
            }
           <Grid item xs={12} sm={6} md={4} key={"create-review"}
              sx={{
                border:'2px #dee2e6 solid',
                borderRadius:'12px',
                padding:'12px',
                width:'100%',
                margin:'6px'
              }}
            >
              <Box mb={1} sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Box  sx={{display:'flex',alignItems:'center'}}>
                  <Avatar sx={{ width: 32, height: 32 }}>w</Avatar> 
                  <Typography ml={1}
                    sx={{
                      fontFamily:'rubik',
                      fontWeight:'400',
                      color:'text.primary',
                      fontSize:'1.2rem'
                    }}
                  >your name</Typography>
                </Box>
                <Box>
                  <Rating name="product-rating"  />
                </Box>
              </Box>

              <Divider/>
              <Box mb={2}>
                <Typography mt={1}
                  sx={{
                    fontFamily:'karla',
                    fontWeight:'500',
                    color:'text.secondary'
                  }}
                >enter your comment</Typography>
              </Box>
              <Button variant='outlined'>Create review</Button>
            </Grid>
          </Grid>
        </Container>
      </div>
     }
    </Container>
  )
}
