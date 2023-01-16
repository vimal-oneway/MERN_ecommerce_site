import React, { useEffect } from 'react'
import { Container } from '@mui/system'
import { Box, Button, CircularProgress, Divider, Grid, Typography, Rating, Avatar } from '@mui/material'
import CreateReview from '../components/CreateReview'
import {useDispatch, useSelector} from 'react-redux';
import { getProduct } from '../actions/productActions'
import { addToCart } from '../actions/addToCart';

export const Product = ({ShowMessage, userData}) => {
  const {product, success, loading }= useSelector((state) => {return state?.productState})

  const dispatch  = useDispatch()
  useEffect(()=>{
    getProduct(dispatch, location.pathname)
  },[])

  return (
    <Container className={'mt-10'}>
     {
     !product
      ?
        <Box
          sx={{
            display:'flex',
            justifyContent:'center',
            height:'80vh',
            alignItems:'center'
          }}
        >
          <CircularProgress/>
        </Box>
      :
      <div>
        <Box sx={{display:'flex', justifyContent:'center'}} mb={2}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} md={6}>
              <img src={`http://localhost:8080${product?.images[0].image}`} alt="product_img" width={"100%"} />
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
                  {product?.name.toUpperCase()}
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
                  <Button variant='outlined' onClick={() => {addToCart(dispatch, product._id)}} sx={{margin:'0 12px 0 0'}}>{"add to cart"}</Button>{" "}
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
            <CreateReview reviews={product?.reviews} userData={userData}/>
          </Grid>
        </Container>
      </div>
     }
    </Container>
  )
}
